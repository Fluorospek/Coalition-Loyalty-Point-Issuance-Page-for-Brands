import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { map, catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { BrandService } from 'src/brand/brand.service';
import { IssueDto } from './dto/issue.dto';
import { ManageDto } from './dto/manage.dto';
import { DistributeDto } from './dto/distribute.dto';

@Injectable()
export class LoyaltyService {
  constructor(
    private readonly databaseservice: DatabaseService,
    private http: HttpService,
    private readonly brandService: BrandService,
  ) {}

  // async brandToken(userId: number) {
  //   const tokenDetails=await this.databaseservice.brandTokens.findUnique({
  //     where:{
  //       userId:userId
  //     }
  //   })
  //   if(!tokenDetails){
  //     throw new NotFoundException('Token Not Found');
  //   }
  //   return {tokenDetails, statusCode: 200};
  // }

  // getIDAmountBySymbol(data, symbol) {
  //   const coins = data.data.coins;
  //   for (const coin of coins) {
  //     if (coin.symbol === symbol) {
  //       return { amount: coin.amount, tokenId: coin.tokenId };
  //     }
  //   }
  //   return null;
  // }

  async manage(userId: number, ManageDto: ManageDto) {
    const res = await this.databaseservice.user.findUnique({
      where: {
        userId: userId,
      },
      include: {
        brand: {
          include: {
            BrandTokens: {
              include: {
                IssuedPoints: true,
              },
            },
          },
        },
      },
    });
    return { res, statusCode: 200 };
  }

  async issue(userId: number, email: string, IssueDto: IssueDto) {
    const brand = await this.brandService.findBrand(userId);
    if (!brand) {
      throw new NotFoundException('Brand Not Found');
    }
    const brandName = brand.brandName;
    console.log(IssueDto);
    const bodyData = {
      data: {},
      decimals: 0,
      description: 'Coalition Loyalty Points',
      image: 'string',
      name: IssueDto.pointName,
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
      symbol: IssueDto.symbol,
      totalSupply: IssueDto.totalSupply,
    };
    console.log(IssueDto.neucron_token);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: IssueDto.neucron_token,
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

    // const token = await this.databaseservice.brandTokens.findUnique({
    //   where: {
    //     userId: userId,
    //   },
    // });
    // if (!token) {
    //   await this.databaseservice.brandTokens.create({
    //     data: {
    //       user: {
    //         connect: {
    //           userId: userId,
    //           email: email,
    //         },
    //       },
    //       pointName: IssueDto.pointName,
    //       symbol: IssueDto.symbol,
    //     },
    //   });
    // }
    // await this.databaseservice.issuedPoints.create({
    //   data: {
    //     user: {
    //       connect: {
    //         userId: userId,
    //       },
    //     },

    //     pointName: IssueDto.pointName,
    //     symbol: IssueDto.symbol,
    //     totalSupply: IssueDto.totalSupply,
    //   },
    // });

    const brandId=brand.brandId;
    const brandToken=await this.databaseservice.brandTokens.findUnique({
      where:{
        brandId:brandId
      }
    });
    if(!brandToken){
      await this.databaseservice.brandTokens.create({
        data:{
          brand:{
            connect:{
              brandId:brandId
            }
          },
          pointName:IssueDto.pointName,
          symbol:IssueDto.symbol
        }
      });
    }
    await this.databaseservice.issuedPoints.create({
      data:{
        brandTokens:{
          connect:{
            brandId:brandId
          }
        },
        totalSupply:IssueDto.totalSupply,
        transactionId:details.data.details.TxID,
        assetId:details.data.details.AssetID,
      }
    });
    return { details, statusCode: 200 };
  }

  async distribute(userId:number,DistributeDto:DistributeDto){
    const issuedPoints=await this.databaseservice.issuedPoints.findUnique({
      where:{
        issuedPointId:DistributeDto.issuedPointId
      }
    });
    if(!issuedPoints){
      throw new NotFoundException('Issued Points Not Found');
    }
    if(issuedPoints.totalSupply<DistributeDto.amount){
      throw new NotFoundException('Insufficient Points');
    }
    await this.databaseservice.transactions.create({
      data:{
        IssuedPoints:{
          connect:{
            issuedPointId:DistributeDto.issuedPointId
          }
        },
        amount:DistributeDto.amount,
        transactionType:'DEBIT',
        recipientAddress:DistributeDto.recipientAddress,
        status:'COMPLETED',
        transactionHash:'string'
      }
    });
  }

  async transactions(userId:number){
    const transactions=await this.databaseservice.user.findUnique({
      where:{userId:userId},
      include:{
        brand:{
          include:{
            BrandTokens:{
              include:{
                IssuedPoints:{
                  include:{
                    Transactions:true
                  }
                }
              }
            }
          }
        }
      }
    });
    return {transactions, statusCode: 200};
  }
}
