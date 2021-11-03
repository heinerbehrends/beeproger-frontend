import Head from 'next/head';
import { useEffect, useState } from 'react';
import AddItemForm from '../components/addItemForm';
import { Button } from '../components/buttonStyles';
import ShowEditItem from '../components/item';
import { Heading, Container, ItemsContainer } from '../components/pageStyles';

export type Item = {
  id: number;
  title: string;
  details: string;
  isDone: number;
  foto: string;
  created_at: string;
  updated_at: string;
};

export default function Home() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  useEffect(() => {
    fetch('http://localhost/api/items')
      .then((response) => response.json())
      .then((items) => setItems(items));
  }, []);
  return (
    <div>
      <Head>
        <title>BeepRoger App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading>Items</Heading>
      <Container>
        <ItemsContainer>
          {items
            ? items.map((item) => (
                <ShowEditItem
                  key={item.id}
                  item={item}
                  items={items}
                  setItems={setItems}
                />
              ))
            : null}
        </ItemsContainer>
        {showAdd ? (
          <AddItemForm
            items={items!}
            setItems={setItems}
            setShowAdd={setShowAdd}
          />
        ) : null}
        {showAdd ? null : (
          <Button
            variant="green"
            css={{
              marginTop: '2rem',
              marginBottom: '4rem',
            }}
            onClick={() => setShowAdd(true)}
          >
            Add an item
          </Button>
        )}
      </Container>
    </div>
  );
}
