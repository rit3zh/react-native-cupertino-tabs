import Heading from '../components/heading';
import Container from '../components/container';
import SearchBarWithFilter from '../components/search-bar-with-filter';
import Label from '../components/label';
import BookList from '../components/book-list';

const HomeScreen = () => {
  return (
    <Container>
      <Heading>Hi rit3zh, let's start off reading some new books</Heading>
      <SearchBarWithFilter />
      <Label>Recommended books for you</Label>
      <BookList />
    </Container>
  );
};

export default HomeScreen;
