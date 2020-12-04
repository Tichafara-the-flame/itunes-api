import React from "react";
import { Table } from "reactstrap";

export default props => {
  const {  groupFavs } = props;

  return (
    <div className="favorite">
      <Table>
        <thead>
          <tr>
            <th>Favorites</th>
            <th>
              <i class="fa fa-music" aria-hidden="true" />
            </th>
          </tr>
        </thead>
      </Table>
      <Table>
        <tbody>
          <tr className="row-container">
            { groupFavs.map(item => {
              return (
                <div>
                  <a key={item.id} href={item.link}>
                    <td className="favorite-wraper">
                      <img
                       
                        src={item.img}
                        alt={item.title}
                      />
                    </td>
                    <td>{item.title}</td>
                  </a>
                </div>
              );
            })}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
