import { Button, Modal, Text, TextInput, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { DateTimePicker } from "@mantine/dates";
import { parseJSON, parseISO } from "date-fns";

async function handleSubmit(eventTitle: string, location: string, date: Date) {
  try {
    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventTitle, location, date: date.toISOString() }),
    });
    if (response.ok) {
      //const data = await response.json();
      console.log("time of event: " + parseISO(date.toISOString()));
    } else {
      console.error("Error creating session");
    }
  } catch (error) {
    console.error("Error creating session", error);
  }

  console.log(eventTitle, location, date.toISOString());
}

function CreateSessions() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      eventTitle: "",
      location: "",
      date: "",
    },
    validate: {},
  });

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Text mb={15}> Create an event</Text>
        <form
          onSubmit={form.onSubmit((values) =>
            handleSubmit(
              values.eventTitle,
              values.location,
              new Date(values.date)
            )
          )}
        >
          <TextInput
            withAsterisk
            label="Title of Event"
            placeholder="Title of Event"
            {...form.getInputProps("eventTitle")}
          />
          <TextInput
            withAsterisk
            label="Location"
            placeholder="Location"
            {...form.getInputProps("location")}
          />

          <DateTimePicker
            valueFormat="D MMMM HH:mm"
            label="Pick date and time of the event"
            placeholder="Pick date and time of the event"
            {...form.getInputProps("date")}
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
      <div>
        <Button onClick={open}>Create Session</Button>
      </div>
    </>
  );
}

export default CreateSessions;
