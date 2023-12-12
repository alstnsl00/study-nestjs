import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('api')
export class ApiController {
  constructor(private configService: ConfigService) {}

  @Get()
  public getApi(): string {
    const apiUrl = this.configService.get('API_URL');
    const apiKey = this.configService.get('API_KEY');

    return this.callApi(apiUrl, apiKey);
  }

  private callApi(apiUrl: string, apiKey: string): string {
    console.log('API 정보 가져오는 중...');
    console.log(apiUrl);
    console.log(apiKey);
    return 'API 호출 완료';
  }
}
