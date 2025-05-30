"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Edit, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { ViewToggle } from "@/components/status/view-toggle";
import { useToast } from "@/hooks/use-toast";

// Импортируем компоненты
import { PricingTypeForm } from "./pricing-type-form";
import { PricingTypesTable } from "./pricing-types-table";
import { PricingTypeCard } from "./pricing-type-card";
import { PricingType } from "@/types/pricing";

export function PricingTypesContent() {
  const { toast } = useToast();
  const router = useRouter();
  const [pricingTypes, setPricingTypes] = useState<PricingType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "table">("table");
  const [showForm, setShowForm] = useState(false);
  const [editingPricingType, setEditingPricingType] =
    useState<PricingType | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pricingTypeToDelete, setPricingTypeToDelete] =
    useState<PricingType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Загрузка типов ценообразования при монтировании компонента
  useEffect(() => {
    fetchPricingTypes();
  }, []);

  // Функция для загрузки типов ценообразования из БД
  const fetchPricingTypes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Запрашиваем данные из таблицы pricing_type_os
      const response = await fetch("/api/settings/pricing-types-os");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Ошибка загрузки типов ценообразования: ${response.statusText}`,
        );
      }
      const data = await response.json();
      setPricingTypes(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Произошла неизвестная ошибка");
      }
      console.error("Ошибка при загрузке типов ценообразования:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для открытия диалога подтверждения удаления
  const openDeleteDialog = (pricingType: PricingType) => {
    setPricingTypeToDelete(pricingType);
    setDeleteDialogOpen(true);
  };

  // Функция удаления типа ценообразования
  const handleDelete = async () => {
    if (!pricingTypeToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/settings/pricing-types-os/${pricingTypeToDelete.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Ошибка удаления типа ценообразования: ${response.statusText}`,
        );
      }

      // Оптимистично удаляем из UI
      setPricingTypes(
        pricingTypes.filter((type) => type.id !== pricingTypeToDelete.id),
      );

      toast({
        title: "Тип ценообразования удален",
        description: `Тип ценообразования "${pricingTypeToDelete.name}" успешно удален`,
      });

      router.refresh(); // Обновляем данные на странице
    } catch (error) {
      console.error("Не удалось удалить тип ценообразования:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Произошла неизвестная ошибка";
      toast({
        title: "Ошибка удаления типа ценообразования",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setPricingTypeToDelete(null);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6" data-oid="5b1pqlr">
        {/* Заголовок страницы */}
        <div className="flex items-center justify-between" data-oid="ji9uh-4">
          <div data-oid="s6_6_72">
            <h2 className="text-lg font-semibold" data-oid="uc.5gwe">
              Типы ценообразования
            </h2>
            <p className="text-sm text-muted-foreground" data-oid="s-naehk">
              Управление типами ценообразования
            </p>
          </div>
          <div className="flex gap-2" data-oid="ck3qp5g">
            {!showForm && (
              <ViewToggle
                view={view}
                onViewChange={setView}
                data-oid="o6ktn.t"
              />
            )}
            {!showForm && (
              <Button
                onClick={() => {
                  setEditingPricingType(null);
                  setShowForm(true);
                }}
                data-oid="ca444b9"
              >
                <Plus className="w-4 h-4 mr-2" data-oid="1y7kzv1" /> Добавить
                тип
              </Button>
            )}
          </div>
        </div>

        {/* Форма или список типов ценообразования */}
        <div data-oid="ir5uq:k">
          {showForm ? (
            <PricingTypeForm
              initialData={editingPricingType}
              onSave={() => {
                setShowForm(false);
                setEditingPricingType(null);
                fetchPricingTypes(); // Обновляем список после сохранения
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingPricingType(null);
              }}
              data-oid="jf6_fy2"
            />
          ) : isLoading ? (
            <Card className="shadow-sm border-none" data-oid="6.0yo1p">
              <CardContent
                className="flex items-center justify-center gap-2 py-6 text-muted-foreground"
                data-oid="q60fq.x"
              >
                <Loader2 className="h-5 w-5 animate-spin" data-oid="1qh_d5v" />
                <p data-oid="z_fbm7i">Загрузка типов ценообразования...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card
              className="shadow-sm border-destructive bg-destructive/10"
              data-oid="4uiba2l"
            >
              <CardContent
                className="flex items-center gap-2 text-destructive py-4"
                data-oid="qlg2:yz"
              >
                <AlertTriangle className="h-5 w-5" data-oid="ixh9w:7" />
                <p className="text-sm font-semibold" data-oid="we.:vl_">
                  Ошибка загрузки типов ценообразования: {error}
                </p>
              </CardContent>
            </Card>
          ) : view === "table" ? (
            <PricingTypesTable
              items={pricingTypes}
              onDelete={(id: number) => {
                const pricingType = pricingTypes.find((t) => t.id === id);
                if (pricingType) openDeleteDialog(pricingType);
              }}
              onEdit={(pricingType: PricingType) => {
                setEditingPricingType(pricingType);
                setShowForm(true);
              }}
              data-oid="xbxp:sh"
            />
          ) : (
            <div className="space-y-4" data-oid="frp3flm">
              {pricingTypes.length > 0 ? (
                pricingTypes.map((pricingType) => (
                  <PricingTypeCard
                    key={pricingType.id}
                    item={pricingType}
                    onEdit={(item) => {
                      setEditingPricingType(item);
                      setShowForm(true);
                    }}
                    onDelete={(id) => {
                      const pricingType = pricingTypes.find((t) => t.id === id);
                      if (pricingType) openDeleteDialog(pricingType);
                    }}
                    data-oid="j9pl5hq"
                  />
                ))
              ) : (
                <Card className="shadow-sm border-none" data-oid="kv5pc:v">
                  <CardContent
                    className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground"
                    data-oid="_m.io2p"
                  >
                    <p className="mb-4" data-oid="otig56d">
                      Типы ценообразования не найдены
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingPricingType(null);
                        setShowForm(true);
                      }}
                      data-oid="xp.49lb"
                    >
                      <Plus className="mr-2 h-4 w-4" data-oid="3:pamms" />
                      Добавить новый тип
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Диалог подтверждения удаления */}
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        data-oid="og42lbk"
      >
        <AlertDialogContent data-oid="726zac3">
          <AlertDialogHeader data-oid="x873io0">
            <AlertDialogTitle data-oid="jh4x4:k">
              Вы уверены, что хотите удалить этот тип ценообразования?
            </AlertDialogTitle>
            <AlertDialogDescription data-oid="sz:5ftt">
              {pricingTypeToDelete && (
                <>
                  Тип ценообразования "
                  <strong data-oid="zorcdst">{pricingTypeToDelete.name}</strong>
                  " будет удален. Это действие нельзя отменить.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter data-oid="06.3zhk">
            <AlertDialogCancel disabled={isDeleting} data-oid="6zj0-me">
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-oid="z14-p0n"
            >
              {isDeleting ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    data-oid=".yqux5h"
                  />
                  Удаление...
                </>
              ) : (
                "Удалить"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
