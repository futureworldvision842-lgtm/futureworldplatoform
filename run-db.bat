@echo off
cd /d "E:\Muhammad's Work VP automation\mq prject\Platform Project"
call npx prisma generate
call npx prisma db push
call npx tsx prisma/seed.ts
