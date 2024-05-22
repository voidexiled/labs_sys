import Link from "next/link"

import { MainWrapper } from "@/components/main-wrapper"
import { MainWrapperContent } from "@/components/main-wrapper-content"
import { MainWrapperHeader } from "@/components/main-wrapper-header"
import { ProfilePhoto } from "@/components/perfil/profile-photo"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { verifyRoleRedirect } from "@/app/auth-server-action/actions"

export default async function ConfiguracionPage() {
    await verifyRoleRedirect();

    // TODO: ENVOLVER EN UN LAYOUT PARA MANEJAR LAS DISTINTAS CONFIGURACIONES CON RUTAS "dashboard/configuracion/general", "dashboard/configuracion/seguridad"
    return (
        <MainWrapper>
            <MainWrapperHeader title="Configuración" />

            <MainWrapperContent>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        <Link href="#" className="font-semibold text-primary">
                            General
                        </Link>
                        <Link href="#">Seguridad</Link>
                        <Link href="#">Integraciones</Link>
                        <Link href="#">Soporte</Link>
                        <Link href="#">Organizaciones</Link>
                        <Link href="#">Avanzado</Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Información personal</CardTitle>
                                <CardDescription>

                                    Tus datos personales son utilizados para identificarte dentro de la pagina web.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <ProfilePhoto name="pp_user_config" />
                                </form>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button>Save</Button>
                            </CardFooter>
                        </Card>

                    </div>
                </div>
            </MainWrapperContent>

        </MainWrapper>
    )
}
