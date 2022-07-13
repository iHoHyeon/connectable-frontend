import { loadTossPayments, TossPaymentsInstance } from '@tosspayments/payment-sdk';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import Button from '~/components/Button';
import EventInfo from '~/components/event/EventInfo';
import { useUserStore } from '~/stores/user';
import { EventDetailType } from '~/types/eventType';

const EVENT: EventDetailType = {
  id: 1,
  image: 'https://assets.otherside.xyz/otherdeeds/871079decce602d36188f532fe6623a15d8c6817ecd3bcd9b0c3a2933bb51c3b.jpg',
  name: '밤 하늘의 별',
  artistName: '디렌리',
  date: new Date(2022, 6, 22).getTime() / 1000 - 9 * 60 * 60,
  description:
    '별이 빛나는 세상을 걸어가고 있는 호랑이의 모습은 우리 삶의 모습으로 비유합니다. 빛나는 세계를 가슴 속에 품고 보이지 않고 뚜렷하지 않는 세상을 걸어가지만, 세상의 달빛은 내 눈과 가슴속 구슬에도 또렷이 맺혀 있습니다. 두 개의 달이 함께 하는 이곳은 현실의 공간을 넘어 어딘가로, 저마다 마음속에 품고 있는 길을 우린 언제나 걷고 있습니다. 달빛의 끝에서 나를 만나고, 저마다 품고 있는 희망을 발견할 수 있기를 희망합니다.',
  salesFrom: new Date(2022, 6, 11).getTime() / 1000 - 9 * 60 * 60,
  salesTo: new Date(2022, 6, 17).getTime() / 1000 - 9 * 60 * 60,
  twitterUrl: 'https://twitter.com/elonmusk',
  instagramUrl: 'https://www.instagram.com/eunbining0904/',
  webpageUrl: 'https://nextjs.org/',
  totalTicketCount: 20,
  onSaleTicketCount: 6,
  price: 10000,
  startTime: new Date(2022, 6, 22, 19, 30).getTime() / 1000 - 9 * 60 * 60,
  endTime: new Date(2022, 6, 22, 21, 30).getTime() / 1000 - 9 * 60 * 60,
  salesOption: 'FLAT_PRICE',
  location: '예술의 전당',
};

export async function getStaticPaths() {
  // fetch id list
  const events = [1, 2, 3];
  const paths = events.map(e => ({ params: { eventId: e.toString() } }));
  console.log(paths);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  console.log(params);
  const eventDetail = EVENT;
  return {
    props: {
      eventDetail,
    },
  };
}

interface Props {
  eventDetail: EventDetailType;
}

export default function EventDetailPage({ eventDetail }: Props) {
  const { isLoggedIn } = useUserStore();
  const [tossPayments, setTossPayment] = useState<TossPaymentsInstance>();

  useEffect(() => {
    (async () => {
      const testClientKey = process.env.NEXT_PUBLIC_TOSS_TEST_CLIENT_KEY;
      if (!testClientKey) return;
      const _tossPayments = await loadTossPayments(testClientKey);
      setTossPayment(_tossPayments);
    })();
  }, []);

  const onTransfer = (tossPayments: TossPaymentsInstance) => {
    tossPayments.requestPayment('계좌이체', {
      // 결제 수단 파라미터
      // 결제 정보 파라미터
      amount: eventDetail.price,
      orderId: 'QhVBczmUBer1Oq6fjjxld',
      orderName: eventDetail.name,
      successUrl: `${process.env.NEXT_PUBLIC_API_URL}/order/success`,
      failUrl: `${process.env.NEXT_PUBLIC_API_URL}/order/fail`,
    });
  };

  return (
    <>
      <Head>
        <title>컬렉션 | {eventDetail.name}</title>
      </Head>
      <div className="relative w-full ">
        <EventInfo eventDetail={eventDetail}></EventInfo>

        <footer className="sticky bottom-0 flex justify-between w-[calc(100%+32px)] py-4 -translate-x-4 bg-transparent backdrop-blur-md">
          <Button
            onClick={() => {
              if (isLoggedIn) {
                if (!tossPayments) return toast.error('오류가 발생했습니다. 다시 시도해 주세요.');
                onTransfer(tossPayments);
              } else toast.error('로그인 후 이용해주세요.');
            }}
          >
            결제하기
          </Button>
        </footer>
      </div>
    </>
  );
}
