export function dataGetRender(data: any, fields: any[]) {
  const d = JSON.parse(JSON.stringify(data));
  fields.forEach((k) => {
    d[k] = d[k]
      ? [
          {
            url: d[k],
            status: 'done',
            response: {
              data: d[k],
            },
          },
        ]
      : [];
  });
  return d;
}

export function dataSetRender(data: any, fields: any[]) {
  const d = JSON.parse(JSON.stringify(data));
  fields.forEach((k) => {
    // console.log(d[k] && d[k].length && d[k][0], '上传图片情况');

    d[k] = d[k] && d[k].length && d[k][0].status == 'done' ? d[k][0].response.data : '';
  });
  return d;
}
