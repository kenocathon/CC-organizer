import useGetRequest from '../../hooks/useGetRequest';
import Search from '../../Search';
import { searchCustomers } from '../../../api/api-customer';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PageHeader from '../../layout/PageHeader';

export default function Customers() {
  const { data } = useGetRequest(searchCustomers);

  return <PageHeader headerIcon={<GroupAddIcon />} title='Customers' />;
}
