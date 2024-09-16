/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DatasetService } from "@/services/DatasetService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const DatasetDelete = ({ id }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await DatasetService.delete(id);
      toast.success("Dataset deletado com sucesso", {
        variant: "success",
        action: {
          label: "Fechar",
        },
      });
      navigate(0);
    } catch (error) {
      toast.error("Erro ao deletar dataset", {
        variant: "error",
        description: error.message,
        action: {
          label: "Fechar",
        },
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p>Deletar</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza que deseja deletar esse dataset?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Sua ação não pode ser desfeita. Isso excluirá permanentemente seu
            dataset e vai remover todos os dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600">
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DatasetDelete;
