import { BASE_LINK, PAGE_URL, ResponseCodes, HTTP_METHOD } from '../../constants';
import { IRaceParameters } from '../../types';

export default class EngineAPI {
  public async operateEngine(
    id: number,
    status: string
  ): Promise<IRaceParameters | { success: boolean }> {
    const url = `${BASE_LINK}/${PAGE_URL.engine}?id=${id}&status=${status}`;
    const response = await fetch(url, {
      method: HTTP_METHOD.patch,
    });
    if (response.status === ResponseCodes.OK) {
      return { ...(await response.json()) };
    }
    return { success: false };
  }
}
