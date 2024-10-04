import { AllSearch, Box, HeaderHome, MostSearch } from '~/components';

export function HomeScreen() {
  return (
    <>
      <Box notpt>
        <HeaderHome />

        <MostSearch />

        <AllSearch />
      </Box>
    </>
  );
}
