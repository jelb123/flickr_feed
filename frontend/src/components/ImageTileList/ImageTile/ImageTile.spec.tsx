import React from 'react';
import { render, screen } from '@testing-library/react';
import { ImageTile } from './index';

const imgSrc = "https://picsum.photos/200"

describe('Test component - ImageTile', () => {
  test('renders ImageTile with only imageUrl supplied', () => {
    render(<ImageTile imageUrl={imgSrc} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', imgSrc)
    expect(imgElement).toBeInTheDocument();
  });

  test('renders ImageTile props if provided', () => {
    const title = "Lorem Picsum Image"
    const author = "Jeff"
    const published = "2020-10-26T05:30:02Z"

    render(
      <ImageTile 
        imageUrl={imgSrc} 
        title={title}
        author={author}
        published={published}
      />
    );
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', imgSrc)
    expect(imgElement).toBeInTheDocument();

    const titleElement = screen.getByText(title)
    const authorElement = screen.getByText(`by: ${author}`)
    const publishedElement = screen.getByText(`published: ${published}`)

    expect(titleElement).toBeInTheDocument()
    expect(authorElement).toBeInTheDocument()
    expect(publishedElement).toBeInTheDocument()
  })
})
