import * as React from 'react';
import {withStyles} from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {styles} from './styles';
import AddrListItem from './AddrListItem';
import {LedgerAddress, Selectable} from './types';


interface Props {
  addresses?: Array<LedgerAddress & Selectable>;
  setSelectedAddr?: any;
  classes?: any;
  accounts?: any;
  balanceRender?: any;
}

function isAlreadyAdded(addr: LedgerAddress, accounts: any) {
  let alreadyAdded = false;
  try {
    const addrId = (addr.address || '---R').toLowerCase();
    alreadyAdded = accounts.some((a) => a.get('id', '---L').toLowerCase() === addrId);
  } catch (e) {
  }
  return alreadyAdded;
}

/**
 * AddrList allows select only one address
 * */
class AddrList extends React.Component<Props> {
    handleAddrSelection = (value) => {
      if (this.props.setSelectedAddr) {
        this.props.setSelectedAddr(value);
      }
    };

    render() {
      const { classes, accounts, balanceRender } = this.props;
      const addresses = this.props.addresses || [];

      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.wideStyle}>ADDRESS</TableCell>
              <TableCell className={classes.mediumStyle}>HD PATH</TableCell>
              <TableCell className={classes.mediumStyle}>BALANCE</TableCell>
              <TableCell className={classes.shortStyle}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { addresses.map((addr) => <AddrListItem
              onSelected={ this.handleAddrSelection }
              key={ addr.hdpath }
              alreadyAdded = { isAlreadyAdded(addr, accounts) }
              addr={ addr }
              balanceRender={ balanceRender }
            />)}
          </TableBody>
        </Table>
      );
    }
}

export default withStyles(styles)(AddrList);