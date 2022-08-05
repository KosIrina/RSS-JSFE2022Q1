import { BASE_LINK, PAGE_URL, ResponseCodes, HTTP_METHOD } from '../../constants';
import { IRaceParameters } from '../../types';

export default class EngineAPI {
  public async operateEngine(
    id: number,
    status: string
  ): Promise<IRaceParameters | { success: boolean }> {
    const response = await fetch(`${BASE_LINK}/${PAGE_URL.engine}?id=${id}&status=${status}`, {
      method: HTTP_METHOD.patch,
    });
    return response.status === ResponseCodes.OK
      ? { ...(await response.json()) }
      : { success: false };
  }
}
