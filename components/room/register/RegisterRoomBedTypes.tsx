import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { bedTypes } from '../../../lib/staticData';
import { useSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import { registerRoomActions } from '../../../store/registerRoom';
import palette from '../../../styles/palette';
import { BedType } from '../../../types/room';
import Button from '../../common/Button';
import Counter from '../../common/Counter';
import Selector from '../../common/Selector';

const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};
  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }

  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }

  .register-room-bed-type-selector-wrapper {
    width: 320px;
  }

  .register-room-bed-type-counters {
    width: 320px;
    margin-top: 28px;
  }

  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${palette.gray_76};
  }
`;

interface IProps {
  bedroom: {id: number; beds: {type: BedType; count: number}[]};
}

const RegisterRoomBedTypes: React.FC<IProps> = ({bedroom}) => {
  const initialBedOptions = bedroom.beds.map((bed) => bed.type);

  // 선택된 침대 옵션들
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(initialBedOptions);
  console.log("activedBedOptions : " + activedBedOptions);
  

  const [opened, setOpened] = useState(false);

  const dispatch = useDispatch();

  // 침대 개수 총합
  const totlaBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  const toggleOpended = () => setOpened(!opened);

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, bedroom])

  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}개`);
    return texts.join(",");
  }, [bedroom]);

  const onChangeBedTypeCount = (value: number, type: BedType) => 
    dispatch(
      registerRoomActions.setBedTypeCount({
        bedroomId: bedroom.id,
        type, 
        count: value,
      })
    );

  console.log("activedBedOptions >>> ");
  console.log(activedBedOptions);

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div className="">
          <p className="register-room-bed-type-bedroom">{bedroom.id}번 침실</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대 {totlaBedsCount} 개 <br/>
            {bedsText}
          </p>
        </div>
          <Button onClick={toggleOpended} width="161px">
            {opened && "완료"}
            {!opened && 
              (totlaBedsCount === 0 ? "침대 추가하기" : "침대 수정하기")}
          </Button>
      </div>
      {opened && (
        <div className="register-room-bed-type-selector-wrapper">
          {activedBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter 
                label={type}
                value={
                  bedroom.beds.find((bed) => bed.type === type)?.count || 0
                }
                key={type}
                onChange={(value) => { 
                  onChangeBedTypeCount(value, type); 
                }}
              />
            </div>
          ))}
          <Selector 
            type="register"
            options={lastBedOptions}
            defaultValue="다른 침대 추가"
            value="다른 침대 추가"
            disabledOptions={["다른 침대 추가"]}
            useValidation={false}
            onChange={(e) => 
              setActivedBedOptions([
                ...activedBedOptions,
                e.target.value as BedType,
              ])
            }
          />
        </div>
      )}
    </Container>
  )
}

export default RegisterRoomBedTypes;