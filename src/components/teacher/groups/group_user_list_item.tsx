import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useToast } from "@/components/ui/use-toast";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import type { Tables } from "@/lib/types/supabase";
import { cn } from "@/lib/utils";

export const GroupUserListItem = ({
	student,
	user,
	refetchCourseStudents,
}: {
	student: Tables<"courses_students">;
	user: Tables<"users">;
	refetchCourseStudents: () => void;
}) => {
	const { toast } = useToast();

	const handleDelete = async () => {
		const supabase = createSupabaseBrowser();
		const { error } = await supabase
			.from("courses_students")
			.delete()
			.eq("id", student.id);
		if (error) {
			console.error(error.message);
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
			return;
		}
		toast({
			title: "Usuario eliminado",
			description: `El usuario ${user.display_name} ha sido eliminado`,
			variant: "default",
		});
		refetchCourseStudents();
	};

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div
					key={student.id}
					className="text relative flex h-[72px] w-full cursor-pointer flex-row items-center justify-between rounded-sm border bg-accent/40 px-4 py-2 text-sm tracking-wider text-muted-foreground shadow-md transition-all hover:bg-accent/80"
				>
					<div className="flex h-full grow  flex-col gap-1">
						<span>{user.display_name}</span>
						<span
							className={cn(
								"text-xs",
								student.assistance_type === "active"
									? "text-success"
									: student.assistance_type === "inactive"
										? "text-error"
										: "text-muted",
							)}
						>
							{student.assistance_type === "active"
								? "Asistencia aprovatoria "
								: student.assistance_type === "inactive"
									? "Asistencia no aprovatoria"
									: "Desertor"}
						</span>
					</div>
					<div className="flex flex-col items-end gap-1" />
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>Ver</ContextMenuItem>
				<ContextMenuItem>Editar</ContextMenuItem>
				<ContextMenuItem onClick={handleDelete}>Eliminar</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};
