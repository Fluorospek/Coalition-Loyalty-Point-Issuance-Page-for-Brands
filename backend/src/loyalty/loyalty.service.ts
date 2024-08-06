import { HttpService } from '@nestjs/axios';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { map, catchError, concatAll, last } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { BrandService } from 'src/brand/brand.service';
import { IssueDto } from './dto/issue.dto';
import { DistributeDto } from './dto/distribute.dto';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { DefineDto } from './dto/define.dto';
import { IssueV2Dto } from './dto/issuev2.dto';

@Injectable()
export class LoyaltyService {
  constructor(
    private readonly databaseservice: DatabaseService,
    private http: HttpService,
    private readonly brandService: BrandService,
  ) {}

  async brandToken(userId: number) {
    // const coalition = await this.databaseservice.coalition.findUnique({
    //   where: {
    //     creatorId: userId,
    //   },
    // });
    // const coalitionId = coalition.coalitionId
    // console.log(coalition);
    // const tokenDetails = await this.databaseservice.brandTokens.findUnique({
    //   where: {
    //     coalitionId: coalitionId,
    //   },
    // });
    // if (!tokenDetails) {
    //   throw new NotFoundException('Token Not Found');
    // }
    // return { tokenDetails, statusCode: 200 };
    // const brand = await this.brandService.findBrand(userId);
    // if (!brand) {
    //   throw new NotFoundException('Brand Not Found');
    // }
    // const brandId = brand.brandId;
    const brandWithCoalition = await this.databaseservice.brand.findUnique({
      where: {
        brandRepId: userId,
      },
      include: {
        Coalition: true,
      },
    });
    if (!brandWithCoalition) {
      throw new NotFoundException('Brand Not Found');
    }
    const coalitionDetails = brandWithCoalition?.Coalition;
    const coalitionId = coalitionDetails.coalitionId;
    const brandToken = await this.databaseservice.brandTokens.findUnique({
      where: {
        coalitionId: coalitionId,
      },
    });
    if (!brandToken) {
      throw new NotFoundException('Token Not Found');
    }
    return { brandToken, statusCode: 200 };
  }

  // getIDAmountBySymbol(data, symbol) {
  //   const coins = data.data.coins;
  //   for (const coin of coins) {
  //     if (coin.symbol === symbol) {
  //       return { amount: coin.amount, tokenId: coin.tokenId };
  //     }
  //   }
  //   return null;
  // }

  async manage(userId: number) {
    // const res = await this.databaseservice.user.findUnique({
    //   where: {
    //     userId: userId,
    //   },
    //   include: {
    //     brand: {
    //       include: {
    //         BrandTokens: {
    //           include: {
    //             IssuedPoints: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
    // return { res, statusCode: 200 };
    // const brand = await this.databaseservice.brand.findUnique({
    //   where: {
    //     brandRepId: userId,
    //   },
    //   include: {
    //     BrandTokens: {
    //       include: {
    //         IssuedPoints: {
    //           orderBy:{
    //             issuedPointId:'asc',
    //           }
    //         },
    //       },
    //     },
    //   },
    // });
    // const brandId = brand.brandId;
    // const brandTokens = await this.databaseservice.brandTokens.findUnique({
    //   where: {
    //     brandId: brandId,
    //   },
    //   include:{
    //     IssuedPoints:true
    //   }
    // });
    // if (!brandTokens) {
    //   throw new NotFoundException('Brand Token Not Found');
    // }
    // const brandTokenId = brandTokens.brandTokenId;
    // const issuedPoints = await this.databaseservice.issuedPoints.findMany({
    //   where: {
    //     brandTokenId: brandTokenId,
    //   },
    // });
    // if (!brand) {
    //   throw new NotFoundException('Brand Not Found');
    // }
    // return { brand, statusCode: 200 };
    const brand = await this.brandService.findBrand(userId);
    if (!brand) {
      throw new NotFoundException('Brand Not Found');
    }
    const brandId = brand.brandId;
    const issuedPoints = await this.databaseservice.issuedPoints.findMany({
      where: {
        brandId: brandId,
      },
    });
    const brandToken = await this.brandToken(userId);
    const tokenDetails = brandToken.brandToken;
    const pointName = tokenDetails.pointName;
    const symbol = tokenDetails.symbol;
    return { pointName, symbol, issuedPoints, statusCode: 200 };
  }

  // async issue(userId: number, email: string, IssueDto: IssueDto) {
  //   const brand = await this.brandService.findBrand(userId);
  //   if (!brand) {
  //     throw new NotFoundException('Brand Not Found');
  //   }
  //   const brandName = brand.brandName;
  //   console.log(IssueDto);
  //   const bodyData = {
  //     data: {},
  //     decimals: 0,
  //     description: 'Coalition Loyalty Points',
  //     image: 'string',
  //     name: IssueDto.pointName,
  //     properties: {
  //       issuer: {
  //         email: email,
  //         governingLaw: 'India',
  //         issuerCountry: 'India',
  //         jurisdiction: 'India',
  //         legalForm: 'Limited',
  //         organisation: brandName,
  //       },
  //       legal: {
  //         licenceId: 'stastoken.com',
  //         terms:
  //           'STAS, Inc. retains all rights to the token script.  Use is subject to terms at https://stastoken.com/license.',
  //       },
  //       meta: {
  //         legal: {
  //           terms: 'Your token terms and description.',
  //         },
  //         media: [
  //           {
  //             URI: 'string',
  //             altURI: 'string',
  //             type: 'string',
  //           },
  //         ],
  //         schemaId: 'STAS1.0',
  //         website: 'string',
  //       },
  //     },
  //     protocolId: 'STAS',
  //     satsPerToken: 1,
  //     splitable: true,
  //     symbol: IssueDto.symbol,
  //     totalSupply: IssueDto.totalSupply,
  //   };
  //   console.log(IssueDto.neucron_token);
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: IssueDto.neucron_token,
  //     'User-Agent': 'axios/1.7.2',
  //   };
  //   const res = await this.http
  //     .post('https://dev.neucron.io/v1/stas/mint', bodyData, { headers })
  //     .pipe(map((res) => res.data))
  //     .pipe(
  //       catchError((err) => {
  //         throw new NotFoundException(err);
  //       }),
  //     );

  //   const details = await lastValueFrom(res);

  //   // const token = await this.databaseservice.brandTokens.findUnique({
  //   //   where: {
  //   //     userId: userId,
  //   //   },
  //   // });
  //   // if (!token) {
  //   //   await this.databaseservice.brandTokens.create({
  //   //     data: {
  //   //       user: {
  //   //         connect: {
  //   //           userId: userId,
  //   //           email: email,
  //   //         },
  //   //       },
  //   //       pointName: IssueDto.pointName,
  //   //       symbol: IssueDto.symbol,
  //   //     },
  //   //   });
  //   // }
  //   // await this.databaseservice.issuedPoints.create({
  //   //   data: {
  //   //     user: {
  //   //       connect: {
  //   //         userId: userId,
  //   //       },
  //   //     },

  //   //     pointName: IssueDto.pointName,
  //   //     symbol: IssueDto.symbol,
  //   //     totalSupply: IssueDto.totalSupply,
  //   //   },
  //   // });

  //   const brandId = brand.brandId;
  //   // const brandToken = await this.databaseservice.brandTokens.findUnique({
  //   //   where: {
  //   //     brandId: brandId,
  //   //   },
  //   // });
  //   // if (!brandToken) {
  //   //   await this.databaseservice.brandTokens.create({
  //   //     data: {
  //   //       brand: {
  //   //         connect: {
  //   //           brandId: brandId,
  //   //         },
  //   //       },
  //   //       pointName: IssueDto.pointName,
  //   //       symbol: IssueDto.symbol,
  //   //     },
  //   //   });
  //   // }
  //   const brandToken = this.define(userId, IssueDto);
  //   // const issuedPoint = await this.databaseservice.issuedPoints.create({
  //   //   data: {
  //   //     brandTokens: {
  //   //       connect: {
  //   //         brandId: brandId,
  //   //       },
  //   //     },
  //   //     totalSupply: IssueDto.totalSupply,
  //   //     totalIssued: IssueDto.totalSupply,
  //   //     transactionId: details.data.details.TxID,
  //   //     assetId: details.data.details.AssetID,
  //   //   },
  //   // });
  //   // return {
  //   //   pontName: IssueDto.pointName,
  //   //   symbol: IssueDto.symbol,
  //   //   issuedPoint,
  //   //   statusCode: 200,
  //   // };
  // }

  async distribute(
    userId: number,
    email: string,
    DistributeDto: DistributeDto,
  ) {
    const issuedPoints = await this.databaseservice.issuedPoints.findUnique({
      where: {
        issuedPointId: DistributeDto.issuedPointId,
      },
    });

    if (!issuedPoints) {
      throw new NotFoundException('Issued Points Not Found');
    }
    if (issuedPoints.totalSupply < DistributeDto.amount) {
      throw new NotFoundException('Insufficient Points');
    }

    const assetId = issuedPoints.assetId;
    const transactionId = issuedPoints.transactionId;
    console.log(assetId);
    console.log(transactionId);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: DistributeDto.access_token,
      'User-Agent': 'axios/1.7.2',
    };

    const walletList = await lastValueFrom(
      this.http
        .get('https://dev.neucron.io/v1/wallet/list', { headers })
        .pipe(map((res) => res.data))
        .pipe(
          catchError((err) => {
            throw new NotFoundException(err);
          }),
        ),
    );

    const walletKey = Object.keys(walletList.data.Wallets).find(
      (key) => walletList.data.Wallets[key].wallet_name === 'main',
    );
    const ownPaymail = walletKey
      ? walletList.data.Wallets[walletKey].paymails[0]
      : null;
    console.log(
      ownPaymail,
      DistributeDto.recipientAddress,
      DistributeDto.amount,
    );

    const bodyData = {
      asset_id: assetId,
      splitDestinations: [
        {
          address: DistributeDto.recipientAddress,
          satoshis: DistributeDto.amount,
        },
        {
          address: ownPaymail,
          satoshis: issuedPoints.totalSupply - DistributeDto.amount,
        },
      ],
    };
    console.log(bodyData);

    const walletAddresses = await lastValueFrom(
      this.http
        .get('https://dev.neucron.io/v1/wallet/address', { headers })
        .pipe(map((res) => res.data))
        .pipe(
          catchError((err) => {
            throw new NotFoundException(err);
          }),
        ),
    );
    console.log(walletAddresses);
    const holdingAddress = walletAddresses.data.addresses[0];
    if (!holdingAddress) {
      throw new NotFoundException('Holding Address Not Found');
    }
    console.log(holdingAddress);

    const res = await lastValueFrom(
      this.http
        .post(
          `https://dev.neucron.io/v1/stas/split?holdingAddress=${holdingAddress}`,
          bodyData,
          { headers },
        )
        .pipe(map((res) => res.data))
        .pipe(
          catchError((err) => {
            throw new NotFoundException(err);
          }),
        ),
    );
    console.log(res);
    console.log(res.data.splited_assets_details[1].AssetID);

    const temp = await this.databaseservice.issuedPoints.update({
      where: {
        issuedPointId: DistributeDto.issuedPointId,
      },
      data: {
        assetId: res.data.splited_assets_details[1].AssetID,
        totalSupply: {
          decrement: DistributeDto.amount,
        },
      },
    });
    console.log(temp);

    const result = await this.databaseservice.transactions.create({
      data: {
        IssuedPoints: {
          connect: {
            issuedPointId: DistributeDto.issuedPointId,
          },
        },
        amount: DistributeDto.amount,
        transactionType: 'DEBIT',
        recipientAddress: DistributeDto.recipientAddress,
        status: 'COMPLETED',
        transactionHash: 'string',
      },
    });
    return { res, statusCode: 200 };
  }

  async transactions(userId: number) {
    const tokenDetails = await this.brandToken(userId);
    const brandTokenId = tokenDetails.brandToken.brandTokenId;
  
    const transactions = await this.databaseservice.issuedPoints.findMany({
      where: { brandTokenId: brandTokenId },
      select: {
        issuedPointId: true,
        Transactions: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    });

    const transactionsArray = transactions.map(
      (transaction) => transaction.Transactions,
    );

    console.log(transactionsArray);

    return {
      pointName: tokenDetails.brandToken.pointName,
      symbol: tokenDetails.brandToken.symbol,
      transactions,
      statusCode: 200,
    };
  }

  async define(userId: number, DefineDto: DefineDto) {
    const coalition = await this.databaseservice.coalition.findUnique({
      where: {
        creatorId: userId,
      },
    });
    if (!coalition) {
      throw new NotFoundException('Coalition Not Found');
    }
    const coalitionId = coalition.coalitionId;

    let brandToken = await this.databaseservice.brandTokens.findUnique({
      where: {
        coalitionId: coalitionId,
      },
    });
    if (brandToken) {
      throw new ConflictException('Token Already Defined');
    }

    brandToken = await this.databaseservice.brandTokens.create({
      data: {
        Coalition: {
          connect: {
            coalitionId: coalitionId,
          },
        },
        pointName: DefineDto.pointName,
        symbol: DefineDto.symbol,
      },
    });
    return { brandToken, statusCode: 200 };
  }

  async issueV2(userId: number, email: string, IssueV2Dto: IssueV2Dto) {
    const brand = await this.brandService.findBrand(userId);
    if (!brand) {
      throw new NotFoundException('Brand Not Found');
    }
    const brandName = brand.brandName;
    const tokenDetails = await this.brandToken(userId);
    console.log(tokenDetails);
    const tokenId = tokenDetails.brandToken.brandTokenId;
    const tokenName = tokenDetails.brandToken.pointName;
    const tokenSymbol = tokenDetails.brandToken.symbol;
    console.log(IssueV2Dto);

    const bodyData = {
      data: {},
      decimals: 0,
      description: 'Coalition Loyalty Points',
      image: 'string',
      name: tokenName,
      properties: {
        issuer: {
          email: email,
          governingLaw: 'India',
          issuerCountry: 'India',
          jurisdiction: 'India',
          legalForm: 'Limited',
          organisation: brandName,
        },
        legal: {
          licenceId: 'stastoken.com',
          terms:
            'STAS, Inc. retains all rights to the token script.  Use is subject to terms at https://stastoken.com/license.',
        },
        meta: {
          legal: {
            terms: 'Your token terms and description.',
          },
          media: [
            {
              URI: 'string',
              altURI: 'string',
              type: 'string',
            },
          ],
          schemaId: 'STAS1.0',
          website: 'string',
        },
      },
      protocolId: 'STAS',
      satsPerToken: 1,
      splitable: true,
      symbol: tokenSymbol,
      totalSupply: IssueV2Dto.totalSupply,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: IssueV2Dto.neucron_token,
      'User-Agent': 'axios/1.7.2',
    };

    const res = await this.http
      .post('https://dev.neucron.io/v1/stas/mint', bodyData, { headers })
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          throw new NotFoundException(err);
        }),
      );
    const details = await lastValueFrom(res);
    const brandId = brand.brandId;

    const issuedPoint = await this.databaseservice.issuedPoints.create({
      data: {
        brandTokens: {
          connect: {
            brandTokenId: tokenId,
          },
        },
        Brand: {
          connect: {
            brandId: brandId,
          },
        },
        totalSupply: IssueV2Dto.totalSupply,
        totalIssued: IssueV2Dto.totalSupply,
        transactionId: details.data.details.TxID,
        assetId: details.data.details.AssetID,
      },
    });
    
    return {
      pontName: tokenName,
      symbol: tokenSymbol,
      issuedPoint,
      statusCode: 200,
    };
  }
}
