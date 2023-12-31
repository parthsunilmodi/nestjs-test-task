import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'Enter your username',
    default: 'test',
  })
  username: string;
  @ApiProperty({
    description: 'Enter your password',
    default: '12345678',
  })
  password: string;
}
