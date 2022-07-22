// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import Button from '~/components/Button';
import OrderForm from '~/components/Form/OrderForm';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

interface Props {
  amount: number;
  numberLimit: number;
}

export default function OrderButton({ amount, numberLimit }: Props) {
  const { isLoggedIn } = useUserStore();
  const { showModal } = useModalStore();

  return (
    <Button
      onClick={() => {
        if (isLoggedIn) {
          showModal('공연 예매하기', <OrderForm amount={amount} numberLimit={numberLimit} />);
        } else {
          toast.error('로그인 후 이용해주세요.');
        }
      }}
    >
      구매하기
    </Button>
  );
}