import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TranslationsModule } from './translations/translations.module';
import { TranslationsHistoryModule } from './translations-history/translations-history.module';
import { VersionsModule } from './versions/versions.module';
import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    TranslationsModule,
    TranslationsHistoryModule,
    VersionsModule,
    LanguagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
