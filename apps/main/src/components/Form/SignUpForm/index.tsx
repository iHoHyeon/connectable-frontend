import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Label from '~/components/Label';
import useUserInfoForm from '~/hooks/useUserInfoForm';

import FormPageContainer from '../FormPageContainer';
import MoreDescriptionContainer from '../MoreDescriptionContainer';

import MoreDescription from './MoreDescription';

export type SignUpFormPage = 'Terms' | 'UserName' | 'PhoneNumber' | 'Finish';

export default function SingUpForm() {
  const [page, setPage] = useState<SignUpFormPage>('Terms');

  const userNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const termOfServiceRef = useRef<HTMLInputElement>(null);
  const termOfPrivacyRef = useRef<HTMLInputElement>(null);

  const {
    handleChangePhoneNumberInput,
    handleClickSubmitButton,
    handleChangeNickNameInput,
    validationNickName,
    validationPhoneNumber,
  } = useUserInfoForm({
    userNameRef,
    phoneNumberRef,
  });

  const [validationTerms, setValidationTerms] = useState(false);

  const handleChangeTermsCheckBox = () => {
    setValidationTerms((termOfServiceRef.current?.checked && termOfPrivacyRef.current?.checked) ?? false);
  };

  const handleCheckKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
    }
    if (e.key === 'Enter') {
      if (page === 'Terms') validationTerms === true && setPage('UserName');
      else if (page === 'UserName') validationNickName === true && setPage('PhoneNumber');
      else if (page === 'PhoneNumber') validationPhoneNumber === true && setPage('Finish');
      else handleClickSubmitButton();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (page === 'UserName') userNameRef.current?.focus();
      if (page === 'PhoneNumber') phoneNumberRef.current?.focus();
    }, 500);
  }, [page]);

  return (
    <div className="w-full mb-10 overflow-hidden">
      <form
        className={`flex ${page === 'UserName' && '-translate-x-1/4'} ${page === 'PhoneNumber' && '-translate-x-1/2'} ${
          page === 'Finish' && '-translate-x-3/4'
        } w-[400%] pt-6 pb-8 mb-4 bg-transparent rounded transition-all ease-in-out duration-[0.5s]`}
        onKeyDown={handleCheckKeyDown}
      >
        <FormPageContainer>
          <div className="relative flex flex-col w-full gap-6 mt-48">
            <label className="inline-flex items-center text-sm font-semibold">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2 text-indigo-600 form-checkbox"
                ref={termOfServiceRef}
                onChange={handleChangeTermsCheckBox}
              />
              <a className="text-blue-500 cursor-pointer" href="/docs/terms-of-service" target="_blank">
                {`[필수] Connectable 이용약관 >`}
              </a>
            </label>
            <label className="inline-flex items-center text-sm font-semibold">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2 text-indigo-600 form-checkbox"
                ref={termOfPrivacyRef}
                onChange={handleChangeTermsCheckBox}
              />
              <span className="text-blue-500 cursor-pointer">{`[필수] 개인정보 수집동의`}</span>
            </label>
            <p className="text-xs font-semibold text-start ">
              개인정보 수집 이용 및 목적
              <br />
              {'>'} 공연 예매자 확인 및 관련 업무 수행 시 이용
              <br />
              <br />
              수집 항목
              <br />
              {'>'} 휴대폰번호
              <br />
              <br />
              보유기간
              <br />
              {'>'} 서비스 종료 또는 사용자 요구 시 파기
              <br />
              <br />
              동의를 거부할 수 있으며 동의 거부 시 서비스 이용이 불가합니다.
              <br />
            </p>
          </div>
          <Button onClick={() => setPage('UserName')} disabled={validationTerms !== true}>
            다음
          </Button>
          <MoreDescriptionContainer>
            <MoreDescription page="Terms" />
          </MoreDescriptionContainer>
        </FormPageContainer>
        <FormPageContainer>
          <Input
            name="username"
            label="닉네임"
            notice={
              validationNickName === 'OVERLAP'
                ? '중복된 닉네임입니다.'
                : '닉네임은 영어 / 한글 / 숫자 / 2~20자 사이로 작성해주세요.'
            }
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={handleChangeNickNameInput}
            autoComplete="off"
            spellCheck={false}
            ref={userNameRef}
          />
          <div className="flex justify-around w-2/3 m-auto ">
            <Button onClick={() => setPage('Terms')} disabled={false}>
              이전
            </Button>
            <Button onClick={() => setPage('PhoneNumber')} disabled={validationNickName !== true}>
              다음
            </Button>
          </div>
          <MoreDescriptionContainer>
            <MoreDescription page="UserName" />
          </MoreDescriptionContainer>
        </FormPageContainer>
        <FormPageContainer>
          <Input
            name="phonenumber"
            label="전화번호"
            type="tel"
            placeholder="전화번호를 입력해주세요"
            maxLength={13}
            onChange={handleChangePhoneNumberInput}
            autoComplete="off"
            spellCheck={false}
            ref={phoneNumberRef}
          />
          <div className="flex justify-around w-2/3 m-auto ">
            <Button onClick={() => setPage('UserName')} disabled={false}>
              이전
            </Button>
            <Button onClick={() => setPage('Finish')} disabled={validationPhoneNumber !== true}>
              다음
            </Button>
          </div>
          <MoreDescriptionContainer>
            <MoreDescription page="PhoneNumber" />
          </MoreDescriptionContainer>
        </FormPageContainer>
        <FormPageContainer>
          <Label text="Connectable에 오신 걸 환영합니다." />
          <Button onClick={() => setPage('PhoneNumber')} disabled={false}>
            이전
          </Button>
          <Button color="red" onClick={() => handleClickSubmitButton()} disabled={false}>
            회원가입 완료하기
          </Button>
          <MoreDescriptionContainer>
            <MoreDescription page="Finish" />
          </MoreDescriptionContainer>
        </FormPageContainer>
      </form>
    </div>
  );
}
