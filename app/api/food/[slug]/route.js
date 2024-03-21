
export async function GET(request, response) {
  const {
    params: { slug }
  } = response;

  // Headers & options
  const headers = {
    'x-foody-access-token':
      '6d676fa812616d1776fcbb5a1730cbc5c922e77683bce29d2466c332b30fe7ec999f2ed48b725ea2f620db199d737912432eeb18a2bd32df5ff511ed66e473a9',
    'x-foody-api-version': '1',
    'x-foody-app-type': '1004',
    'x-foody-client-id': '',
    'x-foody-client-language': 'vi',
    'x-foody-client-type': '1',
    'x-foody-client-version': '3.0.0',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,ko;q=0.6',
    Connection: 'keep-alive',
    'User-Agent': 'PostmanRuntime/7.29.0'
  };

  const options = {
    method: 'GET',
    headers: headers
  };

  async function fetchData(url) {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return await response.json();
  }

  try {
    // Get request_id, just need to change slug to get the new restaurant data
    const requestData = await fetchData(
      'https://gappapi.deliverynow.vn/api/delivery/get_from_url?url=ho-chi-minh/' +
        slug
    );
    const requestId = requestData.reply.delivery_id;

    // Call api to get data
    const requestIdParam = 'request_id=' + requestId;
    const jsonData = await fetchData(
      'https://gappapi.deliverynow.vn/api/dish/get_delivery_dishes?id_type=2&' +
        requestIdParam
    );

    // parse data
    const dishes = jsonData.reply.menu_infos.map((value) => value.dishes);
    const rows = [];
    for (const dishGroup of dishes) {
      for (const dish of dishGroup) {
        const options = dish.options.map((value) => value.option_items);
        const items = options.map((value) => value.items);
        const xy = [];
        for (const itemGroup of items) {
          for (const item of itemGroup) {
            xy.push(
              item.name + (item.price.value ? ':' + item.price.value + 'đ' : '')
            );
          }
        }
        rows.push([
          dish.name,
          dish.discount_price?.text ?? dish.price.text,
          dish.photos[5].value,
          xy.join('|'),
          dish.total_order
        ]);
      }
    }
    return Response.json({ data: rows });
  } catch (error) {
    console.error(error)
    return Response.json({ data: error.message }); // Returning error message
  }
}
