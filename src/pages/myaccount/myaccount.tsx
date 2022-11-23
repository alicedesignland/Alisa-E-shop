import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../main/components/Nav/Nav'
import _ from 'lodash';

const PageSize=5;
const Myaccount = () => {
  const [data, setData] = useState([]);
  const [paginatedData, setpaginatedData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);


  useEffect(() => {
    axios.get('/banktransaction/get-all?PageNumber=1&PageSize=10')
    .then((res) => {
      console.log(res);
      setData(res.data.resultData.data);
      setpaginatedData(_(res.data.resultData.data).slice(0).take(PageSize).value());
    });
  }, []);

  const pageCount = data? Math.ceil(data.length/PageSize) :0;
  if (pageCount ===1) return null;
  const pages = _.range(1, pageCount+1);

  const pagination=(pageNo: React.SetStateAction<number>)=>{
    setcurrentPage(pageNo);
    const startIndex = (pageNo as any - 1 ) * PageSize;
    const paginatedData = _(data).slice(startIndex).take(PageSize).value();
    setpaginatedData(paginatedData)
  };
  return (
    <>
     <Nav />
      <tbody>
        <tr>
          <th>Bank Account</th>
          <th>Action</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Active</th>
        </tr>
        {paginatedData.map((item, id) => (
          <tr key={id}>
            <td>{item.bankAccountId}</td>
            <td>{item.action}</td>
            <td>{item.amount}</td>
            <td>{item.description.toString()}</td>
            <td>{item.isActive.toString()}</td>
            
          </tr>
        ))}
      </tbody>
      <nav className='d-flex justify-content-center'>
        <ul className='pagination'>
          {
            pages.map((page) =>(
              <li className={
                page === currentPage? 'page-item active':'page-item' }
              
              >
                <p className='page-link'
                onClick={()=>pagination(page)}>{page}</p>
              </li>
            ))
          }
        </ul>
      </nav>
    </>
  );
}


export default Myaccount;