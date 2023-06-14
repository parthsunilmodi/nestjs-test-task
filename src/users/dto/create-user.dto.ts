import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    description: 'Enter your name',
    default: 'yash',
  })
  name: string;
  @ApiProperty({
    description: 'Enter your username',
    default: 'yash',
  })
  username: string;
  @ApiProperty({
    description: 'Enter your password',
    default: '12345678',
  })
  password: string;
  refreshToken?: string;
}
