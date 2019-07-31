import { prisma } from '../src/generated/prisma-client';

async function main() {
  await prisma.createAccount({
    hash: '984896456',
    reset_password_token: '984896456',
    reset_password_exp_date: Date.now(),
    username: 'Alice',
    need_onboarding: false,
    email_validated: true,
    emailConfirmToken: '984896456',
  });

  await prisma.createProject({
    name: 'Coucou',
  });
}

main().catch((e) => console.error(e));
