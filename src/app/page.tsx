import { useForm } from "@mantine/form";
import {
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Group,
  Container,
} from "@mantine/core";

export default function Home() {
  const form = useForm({
    initialValues: {
      id: "",
      name: "",
      description: "",
      parentId: "",
    },

    validate: {
      id: (value) => (value ? null : "ID is required"),
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
      description: (value) =>
        value.trim().length > 0 ? null : "Description is required",
      parentId: (value) => (value !== "" ? null : "Parent ID is required"),
    },
  });

  const handleSubmit = (values) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <Container className="mx-auto max-w-lg p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Model Form</h1>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="space-y-4 bg-white p-6 shadow-md rounded-lg"
      >
        <NumberInput
          label="ID"
          placeholder="Enter ID"
          {...form.getInputProps("id")}
          className="w-full"
        />

        <TextInput
          label="Name"
          placeholder="Enter name"
          {...form.getInputProps("name")}
          className="w-full"
        />

        <Textarea
          label="Description"
          placeholder="Enter description"
          {...form.getInputProps("description")}
          className="w-full"
        />

        <NumberInput
          label="Parent ID"
          placeholder="Enter Parent ID"
          {...form.getInputProps("parentId")}
          className="w-full"
        />

        <Group position="right">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Submit
          </Button>
        </Group>
      </form>
    </Container>
  );
}
