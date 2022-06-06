/*Package api contains base API implementation of unified alerting
 *
 *Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 *
 *Do not manually edit these files, please find ngalert/api/swagger-codegen/ for commands on how to generate them.
 */
package api

import (
	"net/http"

	"github.com/grafana/grafana/pkg/api/response"
	"github.com/grafana/grafana/pkg/api/routing"
	"github.com/grafana/grafana/pkg/middleware"
	"github.com/grafana/grafana/pkg/models"
	apimodels "github.com/grafana/grafana/pkg/services/ngalert/api/tooling/definitions"
	"github.com/grafana/grafana/pkg/services/ngalert/metrics"
	"github.com/grafana/grafana/pkg/web"
)

type ConfigurationApiForkingService interface {
	RouteDeleteNGalertConfig(*models.ReqContext) response.Response
	RouteGetAlertmanagers(*models.ReqContext) response.Response
	RouteGetNGalertConfig(*models.ReqContext) response.Response
	RoutePostNGalertConfig(*models.ReqContext) response.Response
}

func (f *ForkedConfigurationApi) RouteDeleteNGalertConfig(ctx *models.ReqContext) response.Response {
	return f.forkRouteDeleteNGalertConfig(ctx)
}
func (f *ForkedConfigurationApi) RouteGetAlertmanagers(ctx *models.ReqContext) response.Response {
	return f.forkRouteGetAlertmanagers(ctx)
}
func (f *ForkedConfigurationApi) RouteGetNGalertConfig(ctx *models.ReqContext) response.Response {
	return f.forkRouteGetNGalertConfig(ctx)
}
func (f *ForkedConfigurationApi) RoutePostNGalertConfig(ctx *models.ReqContext) response.Response {
	conf := apimodels.PostableNGalertConfig{}
	if err := web.Bind(ctx.Req, &conf); err != nil {
		return response.Error(http.StatusBadRequest, "bad request data", err)
	}
	return f.forkRoutePostNGalertConfig(ctx, conf)
}

func (api *API) RegisterConfigurationApiEndpoints(srv ConfigurationApiForkingService, m *metrics.API) {
	api.RouteRegister.Group("", func(group routing.RouteRegister) {
		group.Delete(
			toMacaronPath("/api/v1/ngalert/admin_config"),
			api.authorize(http.MethodDelete, "/api/v1/ngalert/admin_config"),
			metrics.Instrument(
				http.MethodDelete,
				"/api/v1/ngalert/admin_config",
				srv.RouteDeleteNGalertConfig,
				m,
			),
		)
		group.Get(
			toMacaronPath("/api/v1/ngalert/alertmanagers"),
			api.authorize(http.MethodGet, "/api/v1/ngalert/alertmanagers"),
			metrics.Instrument(
				http.MethodGet,
				"/api/v1/ngalert/alertmanagers",
				srv.RouteGetAlertmanagers,
				m,
			),
		)
		group.Get(
			toMacaronPath("/api/v1/ngalert/admin_config"),
			api.authorize(http.MethodGet, "/api/v1/ngalert/admin_config"),
			metrics.Instrument(
				http.MethodGet,
				"/api/v1/ngalert/admin_config",
				srv.RouteGetNGalertConfig,
				m,
			),
		)
		group.Post(
			toMacaronPath("/api/v1/ngalert/admin_config"),
			api.authorize(http.MethodPost, "/api/v1/ngalert/admin_config"),
			metrics.Instrument(
				http.MethodPost,
				"/api/v1/ngalert/admin_config",
				srv.RoutePostNGalertConfig,
				m,
			),
		)
	}, middleware.ReqSignedIn)
}
