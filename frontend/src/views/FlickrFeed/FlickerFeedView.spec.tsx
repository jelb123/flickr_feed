import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { FlickrFeedView } from './index';
import userEvent from '@testing-library/user-event';
import Axios from 'axios';

const tilesMock = [{"title":"Sunset","imageUrl":"https://live.staticflickr.com/65535/50531631803_09f417d4f5_m.jpg","published":"2020-10-26T10:25:30Z","author":"nobody@flickr.com (\"haipbc1967\")"},{"title":"Agrilus sinuatus, Birnbaum-Prachtkäfer","imageUrl":"https://live.staticflickr.com/65535/50531632068_575ffc5a41_m.jpg","published":"2020-10-26T10:25:37Z","author":"nobody@flickr.com (\"naturgucker.de\")"},{"title":"• • Portrait @harry.lil & @ziqianqian • • • • • #LIGHT #INSPIRATION #GOMINIMALMAG #MINIMALZINE #MOOD #GRAINISGOOD #SOFTCOLOR #PORTRAIT #CLASSICSMAGAZINE #INDIEPENDENTMAG #MAGNIFICOMAGZINE #REALISMAG #ANALOG #INDIEPENDENTMAG #ONEARTHMAGAZINE #IMAGINARYMAG","imageUrl":"https://live.staticflickr.com/65535/50531632953_945f269e77_m.jpg","published":"2020-10-26T10:26:07Z","author":"nobody@flickr.com (\"nidfwnns21\")"},{"title":"Termal 2017","imageUrl":"https://live.staticflickr.com/65535/50531633148_b4006860d6_m.jpg","published":"2020-10-26T10:26:11Z","author":"nobody@flickr.com (\"yasinbarmanbay\")"},{"title":" ","imageUrl":"https://live.staticflickr.com/65535/50531633553_b133e3b767_m.jpg","published":"2020-10-26T10:26:20Z","author":"nobody@flickr.com (\"shazibalijpeg\")"},{"title":"1832698 Aircraftman 2nd Class James Wellington Jelfs","imageUrl":"https://live.staticflickr.com/65535/50531633793_46cf27d382_m.jpg","published":"2020-10-26T10:26:24Z","author":"nobody@flickr.com (\"Izaak Newton\")"},{"title":"Watching.","imageUrl":"https://live.staticflickr.com/65535/50531634088_13406a1987_m.jpg","published":"2020-10-26T10:26:31Z","author":"nobody@flickr.com (\"joey-95\")"},{"title":"aentschies Blog","imageUrl":"https://live.staticflickr.com/65535/50531634503_d1e0bfc56c_m.jpg","published":"2020-10-26T10:26:40Z","author":"nobody@flickr.com (\"Diy Home Decor\")"},{"title":"121682636_2532855097015714_8230245417924438034_o.jpg","imageUrl":"https://live.staticflickr.com/65535/50531635238_a73ff0742d_m.jpg","published":"2020-10-26T10:26:59Z","author":"nobody@flickr.com (\"nhadatvideo\")"},{"title":"2020-10-26_04-25-39","imageUrl":"https://live.staticflickr.com/65535/50532353256_1caa959c31_m.jpg","published":"2020-10-26T10:25:48Z","author":"nobody@flickr.com (\"ahad2607\")"},{"title":" ","imageUrl":"https://live.staticflickr.com/65535/50532354221_b603d96c35_m.jpg","published":"2020-10-26T10:26:18Z","author":"nobody@flickr.com (\"WillNewcomb\")"},{"title":"Trekking - Stairway to heaven, Ras Al Khaimah, UAE","imageUrl":"https://live.staticflickr.com/65535/50532354756_91028a0c83_m.jpg","published":"2020-10-26T10:26:32Z","author":"nobody@flickr.com (\"A$h ₹aj\")"},{"title":"IMG_20201007_135519","imageUrl":"https://live.staticflickr.com/65535/50532355186_ec9e70fe10_m.jpg","published":"2020-10-26T10:26:47Z","author":"nobody@flickr.com (\"mgarozg\")"},{"title":"me, snowy on second life","imageUrl":"https://live.staticflickr.com/65535/50532355456_d51fd95d59_m.jpg","published":"2020-10-26T10:26:54Z","author":"nobody@flickr.com (\"magical snowy\")"},{"title":"26/10/20 10:00 - London","imageUrl":"https://live.staticflickr.com/65535/50532511102_2fdf96ccaa_m.jpg","published":"2020-10-26T10:25:35Z","author":"nobody@flickr.com (\"tsnoya\")"},{"title":"Love these from work treats","imageUrl":"https://live.staticflickr.com/65535/50532511522_16c4c65d1c_m.jpg","published":"2020-10-26T10:25:46Z","author":"nobody@flickr.com (\"moonlightescapes\")"},{"title":"Yu Yu Hakusho","imageUrl":"https://live.staticflickr.com/65535/50532511552_f96f8b58b9_m.jpg","published":"2020-10-26T10:25:47Z","author":"nobody@flickr.com (\"adzhali33\")"},{"title":"Attention Seeker","imageUrl":"https://live.staticflickr.com/65535/50532512067_d88af76abd_m.jpg","published":"2020-10-26T10:26:01Z","author":"nobody@flickr.com (\"Mark.L.Sutherland\")"},{"title":"PXL_20201026_093622843.MP~2-01","imageUrl":"https://live.staticflickr.com/65535/50532513132_29d0783c0b_m.jpg","published":"2020-10-26T10:26:28Z","author":"nobody@flickr.com (\"xnjphotox\")"},{"title":"Bagh e Nilab Attock","imageUrl":"https://live.staticflickr.com/65535/50532513497_fcde219d5c_m.jpg","published":"2020-10-26T10:26:37Z","author":"nobody@flickr.com (\"syed24316\")"}]

const server = setupServer(
  rest.get('http://localhost:3001/images', (req, res, ctx) => {
    const randomIndexes = new Set<number>()
    
    for (let i=0; i < 5; i++) {
      randomIndexes.add(Math.floor(Math.random() * tilesMock.length))
    }

    const tiles = Array.from(randomIndexes).map((idx) => tilesMock[idx])
    return res(ctx.json(tiles))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Test View - FlickrFeedView', () => {
  test('renders the input field', async () => {
    await waitFor(async () => {
      await render(<FlickrFeedView />);
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toBeDefined();
    })
  });

  // test('renders children after search value change', async () => {
  //   await waitFor(async () => {
  //     await render(<FlickrFeedView />);
  //     const inputElement = screen.getByRole('textbox');
  //     expect(inputElement.getAttribute('value')).toBe('') // empty before

  //     act(() => {
  //       fireEvent.change(inputElement, { targer: { value: "test" } })
  //     })
  //     expect(inputElement.getAttribute('value')).toBe("test")
  //   })
      
  // })
  
})
