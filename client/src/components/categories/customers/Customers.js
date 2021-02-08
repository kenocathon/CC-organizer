import useGetRequest from '../../hooks/useGetRequest';
import Search from '../../Search';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PageHeader from '../../layout/PageHeader';
import { searchAssets } from '../../../api/api-get';

export default function Customers() {
  const { data } = useGetRequest(searchAssets, '/customers');

  console.log(data);

  return (
    <div>
      <PageHeader
        headerIcon={<GroupAddIcon />}
        title='Customers'
        path='/create'
      />
      <Search data={data} from='customers' />
    </div>
  );
}
