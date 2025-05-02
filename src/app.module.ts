import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailService } from './mail/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { RegionModule } from './region/region.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ViewsModule } from './views/views.module';
import { ColorModule } from './color/color.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { SessionsModule } from './sessions/sessions.module';
import { MulterController } from './multer/multer.controller';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [UserModule, PrismaModule,
    JwtModule.register({
      global: true,
      secret: "sekret",
      signOptions: { expiresIn: '1hr' },
    }),
    RegionModule,
    ProductModule,
    CategoryModule,
    CommentModule,
    LikeModule,
    ViewsModule,
    ColorModule,
    ChatModule,
    MessageModule,
    UsersModule,
    OrderModule,
    SessionsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
})
  ],
  controllers: [AppController, MulterController],
  providers: [AppService, MailService],
})
export class AppModule {}
