import ContainerPage from "@/components/Containers/ContainerPage";
import { Center, Title } from "@mantine/core";

interface HomeProps {}

export default async function Home(props: HomeProps) {
  return (
    <ContainerPage>
      <Center>
        <Title order={1}>Created by OBEREMCHUK</Title>
        {/* <p>Welcome {session?.user.name}!</p> */}
      </Center>
    </ContainerPage>
  );
}
