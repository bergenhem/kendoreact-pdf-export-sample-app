import './NavigationContainer.css'
import { useRef, useState, useEffect, useCallback } from 'react';
import { BottomNavigation } from '@progress/kendo-react-layout';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';

function NavigationContainer(props) {
  const history = useHistory();

  const items = [
    { text: "HTML", id: 1, icon: "html", route: "/", selected: true },
    { text: "Layout", id: 2, icon: "template-manager", route: "/LayoutSample" },
    { text: "KendoReact Grid", id: 3, icon: "grid", route: "/GridExport" },
    { text: "KendoReact TreeList", id: 4, icon: "sort-asc", route: "/TreeListExport" }
  ];

  let currentRoute = 0;
  items.forEach((item, index) => {
    if(item.route === history.location.pathname) {
      currentRoute = index;
    }
  });
  const [selectedId, setSelectedId] = useState(currentRoute);

  const onSelect = (event) => {
    setSelectedId(event.itemIndex);
    history.push(event.itemTarget.route);
  };

  return (
    <>
      <div className="content">
        {props.children}
      </div>
      <BottomNavigation
        positionMode={'fixed'}
        items={items.map(
          (item) => ({ ...item, selected: items[selectedId].text === item.text })
        )}
        onSelect={onSelect}
      />
    </>
  )
}

export default withRouter(NavigationContainer);