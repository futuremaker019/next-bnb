import { createSlice } from "@reduxjs/toolkit"

type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
}

// 초기 상태
const initialState: RegisterRoomState = {
  // 건물 유형 큰 범주
  largeBuildingType: null,
  // 건물 유형
  buildingType: null,
  // 숙소 유형
  roomType: null,
  // 게스트만을 위해 만들어진 숙소 인가
  isSetUpForGuest: null
};

const registerRoom = createSlice({
  name: "registerRomm",
  initialState,
  reducers: {},
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;