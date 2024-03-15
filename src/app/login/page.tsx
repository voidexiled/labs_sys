
'use client'
import { redirect } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MainWrapper } from '@/components/main-wrapper';
import { MainWrapperHeader } from '@/components/main-wrapper-header';
import { MainWrapperContent } from '@/components/main-wrapper-content';
import { Label } from '@/components/ui/label';
import { FormItem } from '@/components/ui/form';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { PasswordInput } from '@/components/ui/password-input';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowingPassword, setIsShowingPassword] = useState(false);

    const { user, setUser, removeUser } = useAuth();

    const router = useRouter();

    const supabase = createClientComponentClient();
    supabase.auth.getUser().then((user) => {
        if (user.data.user) {
            const email = user.data.user.email;
            if (email) {
                setUser({ email: email, loggedIn: true });
                router.replace("/dashboard");
            }
        }

    }).catch((err: any) => { });


    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email, password, options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        router.refresh();
    }

    const handleSignIn = async () => {
        await supabase.auth.signInWithPassword({
            email, password
        }).then((res) => {
            if (!res.error) {
                setUser({ email: email, loggedIn: true });
                router.replace("/dashboard");
            } else {
                alert(res.error.message);
            }

        }).catch((err: any) => {
            (err)
        });
        router.refresh();
    }

    return (
        <MainWrapper>

            <MainWrapperHeader title="Iniciar Sesión" />
            <MainWrapperContent>
                <div className="flex flex-col max-w-[320px] gap-6">
                    <div className='flex flex-col gap-2'>
                        <FormItem >
                            <Label htmlFor="email">Email:</Label>
                            <Input id="email" name="email" type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }} required />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="password">Password:</Label>
                            <PasswordInput
                                className='transition-all duration-300 ease-in-out relative'
                                type={isShowingPassword ? 'text' : 'password'}
                                id="password" name="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}

                                required />




                        </FormItem>
                    </div>


                    <Button onClick={handleSignIn}>Entrar</Button>

                </div>
            </MainWrapperContent>
        </MainWrapper>


    )
}