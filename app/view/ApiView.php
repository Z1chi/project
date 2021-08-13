<?php
declare(strict_types=1);

namespace app\view;

use Ufo\Controller\Controller;
use Ufo\Exception\AffiliateServiceException;
use Ufo\Exception\ApiException;
use Ufo\Exception\UfoException;
use Ufo\Model\Project;
use Ufo\Resource\AffiliateResource;
use Ufo\Resource\AffiliateUrlResource;
use Ufo\Security\Provider\ApiAuthProvider;
use Ufo\Service\AffiliateEventService;
use Ufo\Service\AffiliateUrlService;
use Ufo\Service\AffiliateService;

/**
 * @todo split to separate controllers
 */
class ApiView extends Controller
{
    private AffiliateService $affiliateService;
    private AffiliateEventService $affiliateEventService;
    private AffiliateUrlService $affiliateUrlService;
    private ApiAuthProvider $apiAuthProvider;

    public function __construct($route)
    {
        parent::__construct($route);

        $this->affiliateService = new AffiliateService();
        $this->affiliateEventService = new AffiliateEventService();
        $this->affiliateUrlService = new AffiliateUrlService();
        $this->apiAuthProvider = new ApiAuthProvider();
    }

    public function pingAction(): void
    {
        $this->jsonResponse([
            'message' => 'Pong',
        ]);
    }

    public function affiliateAction(): void
    {
        $project = $this->getProject();

        try {
            if ($this->isPost()) {
                $this->affiliatePost($project);
            } elseif ($this->isGet()) {
                $this->affiliateGet($project);
            } elseif ($this->isPut()) {
                $this->modelDataUpdate($project);
            } else {
                // todo log

                $this->jsonResponse([
                    'message' => 'Unhandled request type',
                ], 400);
            }
        } catch (\Throwable $e) {
            // todo log
            $this->jsonResponse([
                'message' => $this->isProd() ? 'Internal server error' : sprintf('%s (%s:%d)', $e->getMessage(), $e->getFile(), $e->getLine()),
            ], 500);
        }
    }

    public function eventAction(): void
    {
        $project = $this->getProject();

        if ($this->isPost()) {
            try {
                $data = $this->getRequestData();
                $eventName = $data['event_name'] ?? '';
                $smartlink = $data['smartlink'] ?? '';
                $urlId = $data['url_id'] ?? '';
                $userUid = $data['user_uid'] ?? null;
                $deposit = $data['deposit'] ?? null;
                $payout = $data['payout'] ?? null;
                $currency = $data['currency'] ?? null;
                $ip = $data['ip'] ?? null;
                $geo = $data['geo'] ?? null;
                $unique = $data['unique'] ?? null;
                $httpReferrer = $data['http_referrer'] ?? null;
                $eventDateTime = $data['datetime'] ? \DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $data['datetime']) : null;
                if ($smartlink) {
                    $affiliateUrl = $this->affiliateUrlService->getLinkBySmartlink($smartlink);
                } elseif ($urlId) {
                    $affiliateUrl = $this->affiliateUrlService->getLinkByUrlId($urlId);
                } else {
                    throw new UfoException('No link specified');
                }
                if (!$eventDateTime) {
                    throw new UfoException('No date specified');
                }
                $affiliate = $affiliateUrl->affiliate;

                if ('click' === $eventName) {
                    $affiliateLink = $this->affiliateEventService->logClick(
                        $smartlink,
                        $userUid,
                        $ip,
                        $geo,
                        $unique,
                        $httpReferrer,
                        $eventDateTime
                    );
                } elseif ('signup' === $eventName) {
                    $affiliateLink = $this->affiliateEventService->logSignup($smartlink, $userUid, $ip, $geo);
                } elseif ('deposit' === $eventName && $smartlink) {
                    $affiliateLink = $this->affiliateEventService->logDepositBySmartlink($affiliate, $smartlink, $ip, $geo, $deposit, $payout, $currency);
                } elseif ('deposit' === $eventName && $urlId) {
                    $affiliateLink = $this->affiliateEventService->logDepositByUrlId($affiliate, $urlId, $ip, $geo, $deposit, $payout, $currency);
                } else {
                    throw new ApiException(sprintf('Unhandled %s event', $eventName));
                }

                $this->jsonResponse([
                    'url' => AffiliateUrlResource::toArray($affiliateLink),
                    'affiliate' => $affiliate,
                ]);
            } catch (ApiException | AffiliateServiceException $e) {
                $this->jsonResponse([
                    'message' => $e->getMessage(),
                ], 400);
            } catch (\Throwable $e) {
                // todo log
                $this->jsonResponse([
                    'message' => $this->isProd() ? 'Internal server error' : sprintf('%s (%s:%d)', $e->getMessage(), $e->getFile(), $e->getLine()),
                ], 500);
            }
        } else {
            // todo log

            $this->jsonResponse([
                'message' => 'Unhandled request type',
            ], 400);
        }
    }

    public function urlAction(): void
    {
        $project = $this->getProject();
        $affiliateUrlService = new AffiliateUrlService();

        try {
            if ($this->isGet()) { // todo implement project check
                $urlId = (int) ($_GET['id'] ?? '');
                $smartlink = $_GET['smartlink'] ?? '';
                $data = $this->getRequestData();
                if ($urlId) {
                    $affiliateUrl = $affiliateUrlService->getUrlById($urlId);
                } else {
                    $affiliateUrl = $affiliateUrlService->getLinkBySmartlink($smartlink);
                }

                $this->jsonResponse([
                    'url' => AffiliateUrlResource::toArray($affiliateUrl),
                ]);
            } else {
                // todo log

                $this->jsonResponse([
                    'message' => 'Unhandled request type',
                ], 400);
            }
        } catch (\Throwable $e) {
            // todo log
            $this->jsonResponse([
                'message' => $this->isProd() ? 'Internal server error' : sprintf('%s (%s:%d)', $e->getMessage(), $e->getFile(), $e->getLine()),
            ], 500);
        }
    }

    public function iframeAction(): void
    {
        $project = $this->getProject();
        $affiliateUrlService = new AffiliateUrlService();

        try {
            if ($this->isGet()) { // todo implement project check
//                $userUid = $_GET['user_uid'] ?? '';
//
//                $affiliate = Affiliate::where('user_uid', $userUid)->first();
//                if (!$affiliate) {
//                    throw new ApiException('Affiliate not found');
//                }
//                $affiliateUrl = $affiliate->url;
//
//                $this->jsonResponse([
//                    'data' => AffiliateUrlResource::toArray($affiliateUrl),
//                ]);
            } else {
                // todo log

                $this->jsonResponse([
                    'message' => 'Unhandled request type',
                ], 400);
            }
        } catch (ApiException $e) {
            $this->jsonResponse([
                'message' => $e->getMessage(),
            ], 400);
        } catch (\Throwable $e) {
            // todo log
            $this->jsonResponse([
                'message' => $this->isProd() ? 'Internal server error' : sprintf('%s (%s:%d)', $e->getMessage(), $e->getFile(), $e->getLine()),
            ], 500);
        }
    }

    private function affiliatePost(Project $project)
    {
        try {
            $data = $this->getRequestData();

            $affiliate = $this->affiliateService->create($project, $data);
            $this->jsonResponse([
                'message' => 'Affiliate created',
                'data' => AffiliateResource::toArray($affiliate),
            ]);
        } catch (AffiliateServiceException $e) {
            $this->jsonResponse([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    private function affiliateGet(Project $project)
    {
        try {
            $userUid = $_GET['user_uid'] ?? '';
            $affiliate = $this->affiliateService->getByProjectAndUid($project, $userUid);
            $this->jsonResponse([
                'data' => AffiliateResource::toArray($affiliate),
            ]);
        } catch (AffiliateServiceException $e) {
            $this->jsonResponse([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    private function modelDataUpdate(Project $project)
    {
        try {
            $data = $this->getRequestData();
            $affiliatesData = $data['items'];
            $respectProject = $data['respect_project'] ?? true;

            $updated = [];
            foreach ($affiliatesData as $ad) {
                $className = sprintf('\Ufo\Model\%s', $ad['model_name']);
                $model = new $className;
                foreach ($ad['criteria'] as $k => $v) {
                    $model = $model->where($k, $v);
                }
                $model = $model->first();
                if (!$model) {
                    $updated[] = [
                        'class_name' => $ad['model_name'],
                        'criteria' => $ad['criteria'],
                        'message' => 'model not found',
                    ];
                    continue;
                }
                if ($respectProject && $model->affiliate->project_id !== $project->id) {
                    $updated[] = [
                        'class_name' => $ad['model_name'],
                        'criteria' => $ad['criteria'],
                        'id' => $model->id,
                        'message' => 'incorrect project',
                    ];
                    continue;
                } else {
                    // todo check whitelist keys, who can do that
                }
                foreach ($ad['data'] as $k => $v) {
                    $model->{$k} = $v;
                }
                if ($model->save()) {
                    $updated[] = [
                        'class_name' => $ad['model_name'],
                        'id' => $model->id,
                    ];
                }
            }
            $this->jsonResponse([
                'updated' => $updated,
            ]);
        } catch (AffiliateServiceException $e) {
            $this->jsonResponse([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    private function getProject(): Project
    {
        $token = $this->apiAuthProvider->getBearerToken();
        $project = Project::where('token', $token)->first();
        if (!$project) {
            $this->jsonResponse([
                'message' => 'Incorrect token',
            ], 404);
        }

        return $project;
    }

    private function getRequestData(): array
    {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }

    private function isPost(): bool
    {
        return 'post' === strtolower($_SERVER['REQUEST_METHOD']);
    }

    private function isPut(): bool
    {
        return 'put' === strtolower($_SERVER['REQUEST_METHOD']);
    }

    private function isGet(): bool
    {
        return 'get' === strtolower($_SERVER['REQUEST_METHOD']);
    }

    private function isProd(): bool
    {
        return 'prod' === getenv('APP_ENV');
    }
}
