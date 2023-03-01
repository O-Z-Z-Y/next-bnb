import { NextPage, GetServerSidePropsContext } from 'next';
import { getRoomAPI } from "../../lib/api/room";
import { roomActions } from "../../store/room";
import { RoomType } from '../../types/room';
import { useDispatch } from 'react-redux';
import RoomDetail from '../../components/room/detail/RoomDetail';

interface IProps {
  detailRoomData: RoomType
}

const roomDetail: NextPage<IProps> = ({ detailRoomData }) => {
  const dispatch = useDispatch();
  dispatch(roomActions.setDetailRoom(detailRoomData))

  return <RoomDetail />;
};

export const getServerSideProps = async ( context:GetServerSidePropsContext ) => {
  const { id } = context.query;

  try {
    if (id) {
      const { data: detailRoomData } = await getRoomAPI(Number(id as string));
      return {
        props: {
          detailRoomData,
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

export default roomDetail;