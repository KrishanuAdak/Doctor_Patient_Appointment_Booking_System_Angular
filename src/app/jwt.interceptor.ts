import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.includes('/chat')) {
    return next(req);
  }

    const clonedReq = req.clone({
    withCredentials: true    // ✅ only this line needed
  });

  return next(clonedReq);

};
