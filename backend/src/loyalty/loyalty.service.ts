import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { map, catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { BrandService } from 'src/brand/brand.service';

@Injectable()
export class LoyaltyService {
  constructor(
    private readonly databaseservice: DatabaseService,
    private http: HttpService,
    private readonly brandService: BrandService,
  ) {}

  async manage(token: string) {
    const res = await this.http
      .get('https://dev.neucron.io/v1/asset/tokens/list', {
        headers: { Authorization: token },
      })
      .pipe(
        map((res) => res.data?.data),
        map((data) => data.tokens),
      )
      .pipe(
        catchError((err) => {
          throw new NotFoundException('Invalid credentials');
        }),
      );

    const tokens = await lastValueFrom(res);

    return { tokens, status: 200 };
  }

  async issue(
    userId: number,
    email: string,
    body: {
      neucron_token: string;
      pointName: string;
      symbol: string;
      totalSupply: number;
    },
  ) {
    const brand = await this.brandService.findBrand(userId);
    if (!brand) {
      throw new NotFoundException('Brand Not Found');
    }
    const brandName = brand.brandName;
    console.log(body);
    const bodyData = {
      data: {},
      decimals: 0,
      description: 'Coalition Loyalty Points',
      image: 'string',
      name: body.pointName,
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
      symbol: body.symbol,
      totalSupply: Number(body.totalSupply),
    };
    console.log(body.neucron_token);
    const headers = {
        'Content-Type': 'application/json',
      'Authorization': `${body.neucron_token}`,
      'User-Agent': 'axios/1.7.2',
    };
    const res = await this.http
      .post('https://dev.neucron.io/v1/stas/mint', bodyData,{headers})
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          throw new NotFoundException(err);
        }),
      );

    const details = await lastValueFrom(res);
    return { details, status: 200 };
  }
}
