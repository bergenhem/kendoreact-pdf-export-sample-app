import { useRef, useState, useEffect, useCallback } from 'react';
import {
  TreeList,
  orderBy,
  filterBy,
  mapTree,
  extendDataItem,
  TreeListTextFilter,
  TreeListNumericFilter,
  TreeListDateFilter,
  TreeListBooleanFilter,
  TreeListToolbar,
  TreeListColumn
} from "@progress/kendo-react-treelist";
import { Button } from '@progress/kendo-react-buttons'
import { TreeListPDFExport } from "@progress/kendo-react-pdf";
import { treeListSampleEmployees } from './treelist-sample-employees.jsx';

function TreeListExport() {

  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [isPdfExporting, setIsPdfExporting] = useState(false);
  const pdfExportRef = useRef(null);

  const expandField = "expanded";
  const subItemsField = "employees";

  useEffect(
    () => {
      setData(treeListSampleEmployees);
      setExpanded([1, 2, 32]);
    },
    []
  );

  /*
    This function takes in the current "dataTree", which currently is just our data from the
    `treelist-sample-employees.jsx` file. Then, it goes through our current expanded items
    (1, 2, and 32) and uses the mapTree() helper method to create a new array that the TreeList
    can use, now including designated subItemsField, `employees` in our case, (this determines if there)
    are child data items, and also adds the `expanded` field to each item, checking if the item's ID is the same
    as any of the items in the `expanded` array (1, 2, or 32 in our case).

    This new and transformed hierarchical data structure is then returned to out TreeList, letting the component
    have a set of pre-expanded data items.
  */
  const addExpandField = (dataTree) => {
    const currentExpanded = expanded;
    return mapTree(dataTree, subItemsField, item =>
      extendDataItem(item, subItemsField, {
        [expandField]: currentExpanded.includes(item.id)
      })
    );
  };

  const processData = () => {
    return addExpandField(data);
  };

  /*
    This event checks if the current is expanded (event.value === true) or is collapsed
    (event.value === false). If it's true we simply filter out the item from our expanded array since
    we should not collapse the item. If the current item is instead collapsed, we now want to expand it
    by adding the dataItem's id to our existing list `expandedList`
  */
  const onExpandChange = useCallback(
    (event) => {
      let expandedList = expanded;
      expandedList = event.value
        ? expandedList.filter(id => id !== event.dataItem.id)
        : [...expandedList, event.dataItem.id];
      setExpanded(expandedList)
    },
    [expanded]
  );

  const onPdfExport = useCallback(
    () => {
      if(pdfExportRef.current) {
        pdfExportRef.current.save();
      }
    },
    []
  );

  const treeListColumns = [
    {
      field: "name",
      title: "Name",
      width: 250,
      expandable: true
    },
    {
      field: "hireDate",
      title: "Hire Date",
      width: 200
    },
    {
      field: "timeInPosition",
      title: "Year(s) in Position",
      width: 200
    },
    {
      field: "fullTime",
      title: "Full Time",
      width: 100
    }
  ];

  const treeListElement = (
    <TreeList
      data={processData()}
      columns={treeListColumns}
      expandField={expandField}
      subItemsField={subItemsField}
      onExpandChange={onExpandChange}
      toolbar= {
        <TreeListToolbar>
          <Button
            icon="pdf"
            onClick={onPdfExport}
            disabled={isPdfExporting}
          >
          </Button>
        </TreeListToolbar>
      }
    >
    </TreeList>
  );

  return (
    <>
      <h1>TreeList Export</h1>
      {treeListElement}
      <TreeListPDFExport ref={pdfExportRef}>
        {treeListElement}
      </TreeListPDFExport>
    </>
  );
}

export default TreeListExport;