
'use server'
import { redirect } from 'next/navigation';
import { MainWrapper } from '@/components/main-wrapper';
import { MainWrapperHeader } from '@/components/main-wrapper-header';
import { MainWrapperContent } from '@/components/main-wrapper-content';

import { LoginForm } from '@/components/login/LoginForm';
import readUserSession from '@/lib/actions';
import "../globals.css"

export default async function LoginPage() {
    const { data } = await readUserSession();

    if (data.user) {
        return redirect("/dashboard/panel");
    }

    return (
        // <MainWrapper>


        <LoginForm />

        // </MainWrapper>


    )
}