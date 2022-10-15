import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { companyListAtoms, isLoadingAtoms, selectedGovernmentLocationAtoms, selectedSectorAtoms } from '../../../recoil/atoms';
import { CompanyListType } from '../../../types';
import search from '../../../axios';
import SearchOptionContainer from './SearchOptionContainer';

function SearchBar() {
  const setCompanyList = useSetRecoilState(companyListAtoms);
  const inputElement = useRef<HTMLInputElement>(null);
  const setIsLoading = useSetRecoilState(isLoadingAtoms);
  const governmentLocation = useRecoilValue(selectedGovernmentLocationAtoms);
  const sector = useRecoilValue(selectedSectorAtoms);

  useEffect(() => {
    const focus = (e: any) => {
      if (e.key === '/' && !inputElement.current?.onfocus) {
        e.preventDefault();

        inputElement.current?.focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();

        inputElement.current?.blur();
      }
    };
    window.addEventListener('keydown', focus);
    return () => window.removeEventListener('keydown', focus);
  });

  function searchCompany() {
    const inputText = inputElement.current?.value;

    setIsLoading(true);

    search
      .post<CompanyListType>('/search', {
        companyName: inputText,
        governmentLocation: governmentLocation,
        sector: sector,
      })
      .then((response) => {
        setCompanyList(response.data);
      })
      .catch((error) => console.log(error));
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      event.preventDefault();

      searchCompany();

      event.currentTarget.value = '';
    }
  }
  return (
    <div
      css={css({
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr',
        alignItems: 'center',
        width: '100%',
        marginBottom: 25,
      })}
    >
      <p
        css={css({
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '1rem',
        })}
      >
        기업을 검색하세요.
      </p>
      <input
        ref={inputElement}
        onKeyDown={onKeyDown}
        css={css({
          textAlign: 'center',
          justifySelf: 'center',
          fontSize: 42,
          width: '70%',
          maxWidth: 500,
          height: '2.5rem',
        })}
        type="text"
        name=""
        id=""
      />
      <SearchOptionContainer searchCompany={searchCompany} />
    </div>
  );
}

export default SearchBar;