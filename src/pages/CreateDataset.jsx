import DatasetForm from "@/components/DatasetForm";

const CreateDataset = () => {
  return (
    <main className="sm:ml-14 p-6 sm:h-screen w-auto">
      <h1 className="text-4xl font-bold my-4">Novo Dataset</h1>
      <section className="mt-6 max-w-5xl">
        <DatasetForm />
      </section>
    </main>
  );
};

export default CreateDataset;
