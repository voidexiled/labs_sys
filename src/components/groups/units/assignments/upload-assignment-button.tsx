import { useToast } from "@/components/ui/use-toast"
import { createSupabaseBrowser } from "@/lib/supabase/browser"
import { Button } from "@nextui-org/react"
import { motion } from "framer-motion"
import { CloudUpload } from "lucide-react"
import { useRef } from "react"
export const UploadAssignmentButton = ({ isThumb, unitId, refetch }: { isThumb?: boolean, unitId: number, refetch: () => void }) => {
    const { toast } = useToast()
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.files)

        const file = e.target.files ? e.target.files[0] : null
        if (!file) { return }

        const supabase = createSupabaseBrowser()
        const basePathStorage = supabase.storage.from("assignments").getPublicUrl("").data.publicUrl;
        const { data: storageData, error: storageError } = await supabase.storage.from("assignments").upload(file.name, file, { upsert: true, contentType: "application/pdf", cacheControl: "0" });
        if (storageError) {
            console.error(storageError.message);
            toast({
                title: "Error",
                description: storageError.message,
                variant: "destructive",
            });
            return;
        } else {
            const { data: assignmentData, error: assignmentError } = await supabase.from("assignments").insert(
                {
                    title: file.name,
                    description: "",
                    file_name: file.name,
                    visibility: "private",
                    grade_value: 0,
                    end_date: null,
                    unit_id: unitId,


                }
            );

            if (assignmentError) {
                console.error(assignmentError.message);
                toast({
                    title: "Error",
                    description: assignmentError.message,
                    variant: "destructive",
                });
                return;
            } else {

                toast({
                    title: "Archivo subido",
                    description: "Archivo " + file.name + " subido.",
                    variant: "default",
                });
                console.log("storageData: ", storageData);
                // window.location.reload();
                refetch();
            }
        }



    }

    return (
        <>
            {
                isThumb ? (
                    <Button
                        color="primary"
                        variant="light"
                        onClick={() => inputRef.current?.click()}
                        className="min-h-16 min-w-12 px-4 flex flex-row items-center justify-center rounded-sm text-sm border-none ">

                        <div className="flex flex-col gap-1 items-center justify-center text-xs w-full h-full">
                            <CloudUpload size="20" />
                            <span className="tracking-wider">Subir archivo</span>
                        </div>

                    </Button>
                ) :
                    (
                        <Button
                            color="primary"
                            variant="light"
                            onClick={() => inputRef.current?.click()}
                            className="h-12 w-full px-4 py-1  flex flex-row items-center justify-between rounded-sm text-sm border-none ">

                            <div className="flex flex-col gap-1 items-center justify-end text-xs w-full h-full">
                                <CloudUpload size="20" />
                                <span className="tracking-wider">Subir archivo</span>
                            </div>

                        </Button>
                    )
            }

            <input type="file" onChange={handleChange} accept=".pdf"
                id="fileUploader" ref={inputRef} hidden />
        </>
    )

}
