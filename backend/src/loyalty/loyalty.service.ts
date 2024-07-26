import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { map, catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { BrandService } from 'src/brand/brand.service';
import { IssueDto } from './dto/issue.dto';
import { ManageDto } from './dto/manage.dto';
import { DistributeDto } from './dto/distribute.dto';
const RelysiaSDK = require('../../node_modules/@relysia/sdk/src/relysia-sdk');

@Injectable()
export class LoyaltyService {
  constructor(
    private readonly databaseservice: DatabaseService,
    private http: HttpService,
    private readonly brandService: BrandService,
  ) {}

  async brandToken(userId: number) {
    const tokenDetails = await this.databaseservice.brandTokens.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!tokenDetails) {
      throw new NotFoundException('Token Not Found');
    }
    return { tokenDetails, statusCode: 200 };
  }

  getIDAmountBySymbol(data, symbol) {
    const coins = data.data.coins;
    for (const coin of coins) {
      if (coin.symbol === symbol) {
        return { amount: coin.amount, tokenId: coin.tokenId };
      }
    }
    return null;
  }

  async manage(userId: number, ManageDto: ManageDto) {
    // const brand = await this.brandToken(userId);
    // const res = await this.http
    //   .get('', {
    //     headers: { Authorization: 'Bearer ' + token },
    //   })
    //   .pipe(
    //     map((res) => res.data?.data),
    //     map((data) => data.tokens),
    //   )
    //   .pipe(
    //     catchError((err) => {
    //       throw new NotFoundException('Invalid credentials');
    //     }),
    //   );

    // const tokens = await lastValueFrom(res);

    // return { tokens, statusCode: 200 };
    const brand = await this.brandToken(userId);
    const symbol = brand.tokenDetails.symbol;
    const headers = {
      'Content-Type': 'application/json',
      authToken: ManageDto.access_token,
      compact: true,
    };
    const res = await lastValueFrom(
      this.http
        .get('https://api.relysia.com/v2/balance', { headers })
        .pipe(map((res) => res.data))
        .pipe(
          catchError((err) => {
            throw new NotFoundException(err);
          }),
        ),
    );
    console.log(res);
    const details = this.getIDAmountBySymbol(res, symbol);
    console.log(details);
    return {
      symbol,
      tokenId: details.tokenId,
      amount: details.amount,
      statusCode: 200,
    };
  }

  async issue(userId: number, email: string, IssueDto: IssueDto) {
    const brand = await this.brandService.findBrand(userId);
    if (!brand) {
      throw new NotFoundException('Brand Not Found');
    }
    const brandName = brand.brandName;
    console.log(IssueDto);
    const bodyData = {
      name: IssueDto.pointName,
      symbol: IssueDto.symbol,
      description:
        'Coalition Loyalty Points are a digital asset that can be used to redeem rewards and discounts at participating brands.',
      image: 'string',
      tokenSupply: IssueDto.totalSupply,
      decimals: 0,
      satsPerToken: 1,
      properties: {
        legal: {
          terms:
            'STAS, Inc. retains all rights to the token script.  Use is subject to terms at https://stastoken.com/license.',
          licenceId: 'stastoken.com',
        },
        issuer: {
          organisation: brandName,
          legalForm: 'Limited',
          governingLaw: 'India',
          issuerCountry: 'India',
          jurisdiction: 'India',
          email: 'info@vaionex.com',
        },
        meta: {
          schemaId: 'STAS1.0',
          website: 'coalitionloyalty.com',
          legal: {
            terms: 'Your token terms and description.',
          },
          media: [
            {
              URI: 'string',
              type: 'string',
              altURI: 'string',
            },
          ],
        },
      },
      splitable: true,
      data: {},
    };
    const headers = {
      'Content-Type': 'application/json',
      authToken: IssueDto.access_token,
      reminting: true,
      type: 'token',
    };
    const res = await lastValueFrom(
      this.http
        .post('https://api.relysia.com/v2/issue', bodyData, { headers })
        .pipe(map((res) => res.data))
        .pipe(
          catchError((err) => {
            throw new NotFoundException(err);
          }),
        ),
    );
    const token = await this.databaseservice.brandTokens.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!token) {
      await this.databaseservice.brandTokens.create({
        data: {
          user: {
            connect: {
              userId: userId,
              email: email,
            },
          },
          pointName: IssueDto.pointName,
          symbol: IssueDto.symbol,
        },
      });
    }
    return { res, statusCode: 200 };
  }

  async distribute(userId: number, DistributeDto: DistributeDto) {
    const tokenDetails = await this.manage(userId, DistributeDto);
    const amount = tokenDetails.amount;
    if (amount < DistributeDto.amount) {
      throw new NotFoundException('Insufficient Balance');
    }
    const tokenId = tokenDetails.tokenId;
    const headers = {
      'Content-Type': 'application/json',
      authToken: DistributeDto.access_token,
    };
    const bodyData = {
      dataArray: [
        {
          'to': DistributeDto.recipientAddress,
          'amount': DistributeDto.amount,
          'tokenId': tokenId,
        },
      ],
    };
    const res= await lastValueFrom(
      this.http
        .post('https://api.relysia.com/v2/send', bodyData, { headers })
        .pipe(map((res) => res.data))
        .pipe(
          catchError((err) => {
            throw new NotFoundException(err);
          }),
        ),
    );
    if(res){
      return {distributionId:res.data.txIds[0],statusCode:200}
    }
    else{
      throw new NotFoundException('Distribution Failed');
    }
  }

  async transactions(userId: number, ManageDto: ManageDto) {
    const details = await this.manage(userId, ManageDto);
    const tokenId = details.tokenId;
    const headers = {
      'Content-Type': 'application/json',
      authToken: ManageDto.access_token,
    };
    const res = await lastValueFrom(
      this.http
        .get('https://api.relysia.com/v2/transactions', { headers })
        .pipe(map((res) => res.data))
        .pipe(
          catchError((err) => {
            throw new NotFoundException(err);
          }),
        ),
    );
    const transactions = res.data.histories.to;
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.tokenId === tokenId,
    );
    return { transactions: filteredTransactions, statusCode: 200 };
  }
}
