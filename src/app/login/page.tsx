
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
    supabase.auth.getUser().then(async (user) => {
        if (user.data.user) {
            const email = user.data.user.email;
            const userInDb = await verifyIsInDB();

            if (email) {
                setUser({ email: email, loggedIn: true, role: userInDb.roleId });
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
        }).then(async (res) => {
            if (!res.error) {
                const user = await verifyIsInDB();
                const userToStore = { email: email, loggedIn: true, role: user.roleId };
                // console.log(userToStore)
                setUser(userToStore);

                router.replace("/dashboard");
            } else {
                alert(res.error.message);
            }

        }).catch((err: any) => {
            (err)
        });
        router.refresh();
    }

    const verifyIsInDB = async () => {
        let user: {
            email: string;
            roleId: number;
            uuid: string;
        } = {
            email: email,
            roleId: 5,
            uuid: "",

        };
        // Verify if exist in db Users
        const { data, error } = await supabase.from('users').select('*').eq('email', email);
        // Getting UUID by cookies
        const uuid = (await supabase.auth.getUser()).data.user?.id;


        if (uuid) {
            user = { email: email, uuid: uuid, roleId: 5 }
        }
        if (data) {

            if (data.length === 0) {

                // console.log(uuid);
                if (uuid) {
                    // const createdAt = Date();
                    // const lastLoginAt = Date.now().valueOf();
                    // console.log(createdAt, lastLoginAt);

                    // insert the user row in users table if not exists
                    await supabase.from('users').insert(user);
                }
            } else {
                if (data[0]) {
                    user = { email: email, uuid: data[0].uuid, roleId: data[0].roleId }
                }
            }
        }
        if (error) {

            // console.log(error?.message)
        }

        return user;
    }
    return (
        <MainWrapper>

            <MainWrapperHeader title="Iniciar Sesión" />
            <MainWrapperContent>
                <form className="flex flex-col max-w-[320px] gap-6" onSubmit={(e) => {
                    e.preventDefault();
                }}>
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


                    <Button onClick={handleSignIn} type='submit' >Entrar</Button>

                </form>
            </MainWrapperContent>
        </MainWrapper>


    )
}