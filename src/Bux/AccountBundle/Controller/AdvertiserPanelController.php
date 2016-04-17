<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/13/15
 * Time: 3:47 PM
 */

namespace Bux\AccountBundle\Controller;

use APY\DataGridBundle\Grid\Action\RowAction;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\AccountBundle\Form\Type\Ads\CreditsAllocateFormType;
use Bux\AccountBundle\Form\Type\Ads\VideoAdsFormType;
use Bux\AccountBundle\Resources\views\AdvertiserPanel\Grid\Column\ClicksOutsideColumn;
use Bux\AccountBundle\Resources\views\AdvertiserPanel\Grid\Column\ViewsClicksColumn;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class AdvertiserPanelController
 *
 * @package Bux\AccountBundle\Controller
 */
class AdvertiserPanelController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/advertiser-panel", name="office_account_advertiser_panel")
     * @Template("BuxAccountBundle:AdvertiserPanel:advertiser_panel.html.twig")
     */
    public function advertiseManageAction(Request $request)
    {
        if ($request->isMethod('POST')) {
            switch ($request->get('ad')) {
                case 1:
                    return $this->redirect($this->generateUrl('office_account_add_video_ads'));
                    break;
                case 2:
                    return $this->redirect($this->generateUrl('office_account_add_poll_ads'));
                    break;
                case 3:
                    return $this->redirect($this->generateUrl('office_account_add_auto_serf_ad'));
                    break;
                case 4:
                    return $this->redirect($this->generateUrl('office_account_add_banner_ad'));
                    break;
                case 5:
                    return $this->redirect($this->generateUrl('office_account_add_vip_banner_ad'));
                    break;
            }
        }

        return array(

        );
    }

    /**
     * @return array
     *
     * @Route("/view-video", name="grid_test")
     */
    public function viewVideoAction()
    {
        $user = $this->getUser();

        $source = new Entity('BuxAdvertiseBundle:VideoAd');
        $grid = $this->get('grid');
        $tableAlias = $source->getTableAlias();
        $source->manipulateQuery(
            function ($query) use ($tableAlias, $user)
            {
                /* @var $query \Doctrine\ORM\QueryBuilder */
                $query
                    ->andWhere($tableAlias . '.user = :user')
                    ->setParameter('user', $user);
            }
        );

        $grid->setSource($source);
        $grid->hideColumns(array(
            'id',
            'description',
            'targetUrl',
//            'premiumMembers',
            'validate',
            'clicks',
            'outside',
            'maxClickInDay',
            'pause'
        ));
        $grid->hideFilters();
//        $grid->isReadyForRedirect();
        $grid->setRouteUrl($this->generateUrl('grid_test'));

        $grid->getColumn('title')->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.ad'));
        $grid->getColumn('credits')->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.credits'));

        $clicksOutside = new ClicksOutsideColumn();
        $clicksOutside->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.clicks_outside'));
        $clicksOutside->manipulateRenderCell(function($value, $row, $router) {
            return array(
                'clicks' => $row->getField('clicks'),
                'outside' => $row->getField('outside'),
            );
        });
        $grid->addColumn($clicksOutside, 9);

        $validate = new RowAction('validate', 'office_account_video_ad_validate');
        $validate->setRouteParameters(array('id'));
        $validate->setTarget('_blank');
        $validate->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 0) {
                    return null;
                }

                return $action;
            }
        );
        $grid->addRowAction($validate);

        $pause = new RowAction('pause', 'office_account_pause_video_ad');
        $pause->setRouteParameters(array('id'));
		$translator = $this->get('translator');
        $pause->manipulateRender(
            function ($action, $row) use ($translator)
            {
                /* @var $action RowAction */
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                if ($row->getField('pause')) {
                    $action->addAttribute('title', $translator->trans('frontend.account.advertiser.table.start'));
                } else {
                    $action->addAttribute('title', $translator->trans('frontend.account.advertiser.table.pause'));
                }

                return $action;
            }
        );
        $grid->addRowAction($pause);

        $delete = new RowAction('delete', 'office_account_delete_video_ad');
        $delete->setRouteParameters(array('id'));
        $delete->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                return $action;
            }
        );
        $delete->setConfirm(true);
        $grid->addRowAction($delete);

        $allocate = new RowAction('allocate', 'office_account_video_ad_allocate');
        $allocate->setRouteParameters(array('id'));
        $allocate->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                return $action;
            }
        );
        $grid->addRowAction($allocate);




        return $grid->getGridResponse('BuxAccountBundle:AdvertiserPanel:grid.html.twig');
    }

    /**
     * @return array
     *
     * @Route("/view-poll-ads", name="view_poll_ads")
     */
    public function viewPollAdsAction()
    {
        $source = new Entity('BuxAdvertiseBundle:PollAd');
        $grid = $this->get('grid');
        $tableAlias = $source->getTableAlias();
        $user = $this->getUser();

        $source->manipulateQuery(
            function ($query) use ($tableAlias, $user)
            {
                /* @var $query \Doctrine\ORM\QueryBuilder */
                $query
                    ->andWhere($tableAlias . '.user = :user')
                    ->setParameter('user', $user);
            }
        );

        $grid->setSource($source);
        $grid->hideColumns(array(
            'id',
            'description',
//            'premiumMembers',
            'validate',
            'clicks',
            'outside',
            'maxClickInDay',
            'pause',
            'question'
        ));
        $grid->hideFilters();
//        $grid->isReadyForRedirect();
        $grid->setRouteUrl($this->generateUrl('grid_test'));

        $grid->getColumn('title')->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.ad'));
        $grid->getColumn('credits')->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.credits'));

        $clicksOutside = new ClicksOutsideColumn();
        $clicksOutside->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.clicks_outside'));
        $clicksOutside->manipulateRenderCell(function($value, $row, $router) {
            return array(
                'clicks' => $row->getField('clicks'),
                'outside' => $row->getField('outside'),
            );
        });
        $grid->addColumn($clicksOutside, 9);

        $validate = new RowAction('validate', 'office_account_poll_ad_validate');
        $validate->setRouteParameters(array('id'));
        $validate->setTarget('_blank');
        $validate->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 0) {
                    return null;
                }

                return $action;
            }
        );
        $grid->addRowAction($validate);

        $pause = new RowAction('pause', 'office_account_pause_poll_ad');
        $pause->setRouteParameters(array('id'));
        $translator = $this->get('translator');

        $pause->manipulateRender(
            function ($action, $row) use ($translator)
            {
                /* @var $action RowAction */
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                if ($row->getField('pause')) {
                    $action->addAttribute('title', $translator->trans('frontend.account.advertiser.table.start'));
                } else {
                    $action->addAttribute('title', $translator->trans('frontend.account.advertiser.table.pause'));
                }

                return $action;
            }
        );
        $grid->addRowAction($pause);

        $delete = new RowAction('delete', 'office_account_delete_poll_ad');
        $delete->setRouteParameters(array('id'));
        $delete->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                return $action;
            }
        );
        $delete->setConfirm(true);
        $grid->addRowAction($delete);

        $allocate = new RowAction('allocate', 'office_account_poll_ad_allocate');
        $allocate->setRouteParameters(array('id'));
        $allocate->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                return $action;
            }
        );
        $grid->addRowAction($allocate);




        return $grid->getGridResponse('BuxAccountBundle:AdvertiserPanel:grid.html.twig');
    }

    /**
     * @return array
     *
     * @Route("/view-auto-serf", name="view_auto_serf_ads")
     */
    public function viewAutoSerfAdsAction()
    {
        $source = new Entity('BuxAdvertiseBundle:AutoSerfAd');
        $grid = $this->get('grid');
        $tableAlias = $source->getTableAlias();
		$user = $this->getUser();
        $source->manipulateQuery(
            function ($query) use ($tableAlias, $user)
            {
                /* @var $query \Doctrine\ORM\QueryBuilder */
                $query
                    ->andWhere($tableAlias . '.user = :user')
                    ->setParameter('user', $user);
            }
        );
        $grid->setSource($source);
        $grid->hideColumns(array(
            'id',
            'targetUrl',
            'validate',
            'clicks',
            'outside',
            'maxClickInDay',
            'pause'
        ));
        $grid->hideFilters();
//        $grid->isReadyForRedirect();
        $grid->setRouteUrl($this->generateUrl('grid_test'));

        $grid->getColumn('title')->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.ad'));
        $grid->getColumn('credits')->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.credits'));

        $clicksOutside = new ClicksOutsideColumn();
        $clicksOutside->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.clicks_outside'));
        $clicksOutside->manipulateRenderCell(function($value, $row, $router) {
            return array(
                'clicks' => $row->getField('clicks'),
                'outside' => $row->getField('outside'),
            );
        });
        $grid->addColumn($clicksOutside, 9);

        $validate = new RowAction('validate', 'office_account_video_ad_validate');
        $validate->setRouteParameters(array('id'));
        $validate->setTarget('_blank');
        $validate->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 0) {
                    return null;
                }

                return $action;
            }
        );
        $grid->addRowAction($validate);

        $pause = new RowAction('pause', 'office_account_pause_autosurf_ad');
        $pause->setRouteParameters(array('id'));
        $translator = $this->get('translator');
        $pause->manipulateRender(
            function ($action, $row) use ($translator)
            {
                /* @var $action RowAction */
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                if ($row->getField('pause')) {
                    $action->addAttribute('title', $translator->trans('frontend.account.advertiser.table.start'));
                } else {
                    $action->addAttribute('title', $translator->trans('frontend.account.advertiser.table.pause'));
                }

                return $action;
            }
        );
        $grid->addRowAction($pause);

        $delete = new RowAction('delete', 'office_account_delete_autosurf_ad');
        $delete->setRouteParameters(array('id'));
        $delete->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                return $action;
            }
        );
        $delete->setConfirm(true);
        $grid->addRowAction($delete);

        $allocate = new RowAction('allocate', 'office_account_autosurf_ad_allocate');
        $allocate->setRouteParameters(array('id'));
        $allocate->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                return $action;
            }
        );
        $grid->addRowAction($allocate);




        return $grid->getGridResponse('BuxAccountBundle:AdvertiserPanel:grid.html.twig');
    }

    /**
     * @return array
     *
     * @Route("/view-banner", name="view_banner_ads")
     */
    public function viewBannerAdsAction()
    {
        $source = new Entity('BuxAdvertiseBundle:BannerAd');
        $grid = $this->get('grid');
        $tableAlias = $source->getTableAlias();
        $user = $this->getUser();
        $source->manipulateQuery(
            function ($query) use ($tableAlias, $user)
            {
                /* @var $query \Doctrine\ORM\QueryBuilder */
                $query
                    ->andWhere($tableAlias . '.user = :user')
                    ->setParameter('user', $user);
            }
        );
        $grid->setSource($source);
        $grid->hideColumns(array(
            'id',
            'targetUrl',
            'validate',
            'clicks',
            'views',
            'bannerUrl',
            'pause'
        ));
        $grid->hideFilters();
//        $grid->isReadyForRedirect();
        $grid->setRouteUrl($this->generateUrl('grid_test'));

        $grid->getColumn('title')->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.ad'));
        $grid->getColumn('credits')->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.credits'));

//        $clicksOutside = new ClicksOutsideColumn();
        $clicksOutside = new ViewsClicksColumn();
        $clicksOutside->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.views_clicks'));
        $clicksOutside->manipulateRenderCell(function($value, $row, $router) {
            return array(
                'views' => $row->getField('views'),
                'clicks' => $row->getField('clicks'),
            );
        });
        $grid->addColumn($clicksOutside, 9);

        $validate = new RowAction('validate', 'office_account_video_ad_validate');
        $validate->setRouteParameters(array('id'));
        $validate->setTarget('_blank');
        $validate->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 0) {
                    return null;
                }

                return $action;
            }
        );
        $grid->addRowAction($validate);

        $pause = new RowAction('pause', 'office_account_pause_banner_ad');
        $pause->setRouteParameters(array('id'));
        $translator = $this->get('translator');
        $pause->manipulateRender(
            function ($action, $row) use ($translator)
            {
                /* @var $action RowAction */
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                if ($row->getField('pause')) {
                    $action->addAttribute('title', $translator->trans('frontend.account.advertiser.table.start'));
                } else {
                    $action->addAttribute('title', $translator->trans('frontend.account.advertiser.table.pause'));
                }

                return $action;
            }
        );
        $grid->addRowAction($pause);

        $delete = new RowAction('delete', 'office_account_delete_banner_ad');
        $delete->setRouteParameters(array('id'));
        $delete->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                return $action;
            }
        );
        $delete->setConfirm(true);
        $grid->addRowAction($delete);

        $allocate = new RowAction('allocate', 'office_account_banner_ad_allocate');
        $allocate->setRouteParameters(array('id'));
        $allocate->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                return $action;
            }
        );
        $grid->addRowAction($allocate);




        return $grid->getGridResponse('BuxAccountBundle:AdvertiserPanel:grid.html.twig');
    }

    /**
     * @return array
     *
     * @Route("/view-vip-banner", name="view_vip_banner_ads")
     */
    public function viewVipBannerAdsAction()
    {
        $source = new Entity('BuxAdvertiseBundle:BigBannerAd');
        $grid = $this->get('grid');
        $tableAlias = $source->getTableAlias();
		$user = $this->getUser();
        $source->manipulateQuery(
            function ($query) use ($tableAlias, $user)
            {
                /* @var $query \Doctrine\ORM\QueryBuilder */
                $query
                    ->andWhere($tableAlias . '.user = :user')
                    ->setParameter('user', $user);
            }
        );
        $grid->setSource($source);
        $grid->hideColumns(array(
            'id',
            'targetUrl',
            'validate',
            'clicks',
            'views',
            'bannerUrl',
            'pause'
        ));
        $grid->hideFilters();
//        $grid->isReadyForRedirect();
        $grid->setRouteUrl($this->generateUrl('grid_test'));

        $grid->getColumn('title')->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.ad'));
        $grid->getColumn('credits')->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.credits'));

        $clicksOutside = new ViewsClicksColumn();
        $clicksOutside->setTitle($this->get('translator')->trans('frontend.account.advertiser.table.views_clicks'));
        $clicksOutside->manipulateRenderCell(function($value, $row, $router) {
            return array(
                'views' => $row->getField('views'),
                'clicks' => $row->getField('clicks'),
            );
        });
        $grid->addColumn($clicksOutside, 9);

        $validate = new RowAction('validate', 'office_account_video_ad_validate');
        $validate->setRouteParameters(array('id'));
        $validate->setTarget('_blank');
        $validate->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 0) {
                    return null;
                }

                return $action;
            }
        );
        $grid->addRowAction($validate);

        $pause = new RowAction('pause', 'office_account_pause_vip_banner_ad');
        $pause->setRouteParameters(array('id'));
        $translator = $this->get('translator');
        $pause->manipulateRender(
            function ($action, $row) use ($translator)
            {
                /* @var $action RowAction */
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                if ($row->getField('pause')) {
                    $action->addAttribute('title', $translator->trans('frontend.account.advertiser.table.start'));
                } else {
                    $action->addAttribute('title', $translator->trans('frontend.account.advertiser.table.pause'));
                }

                return $action;
            }
        );
        $grid->addRowAction($pause);

        $delete = new RowAction('delete', 'office_account_delete_vip_banner_ad');
        $delete->setRouteParameters(array('id'));
        $delete->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                return $action;
            }
        );
        $delete->setConfirm(true);
        $grid->addRowAction($delete);

        $allocate = new RowAction('allocate', 'office_account_vip_banner_ad_allocate');
        $allocate->setRouteParameters(array('id'));
        $allocate->manipulateRender(
            function ($action, $row)
            {
                if (!$row->getField('validate') == 1) {
                    return null;
                }

                return $action;
            }
        );
        $grid->addRowAction($allocate);

        return $grid->getGridResponse('BuxAccountBundle:AdvertiserPanel:grid.html.twig');
    }


    /**
     * @param int $id
     *
     * @return array
     *
     * @Route("/video-ad-validate/{id}", name="office_account_video_ad_validate")
     * @Template("BuxAccountBundle:AdvertiserPanel:Validate/video_ad_validate.html.twig")
     */
    public function videoAdValidate($id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:VideoAd')->find($id);
        if (!$ad) {
            throw new NotFoundHttpException('Not Found!');
        }

        return array(
            'ad'    => $ad
        );
    }

//    /**
//     * @Route("/test", name="test")
//     * @return array
//     */
//    public function testAction()
//    {
//        return array();
//    }

    /**
     * @param Request $request
     *
     * @return Response
     *
     * @Route("/video-validate-success", name="video_ad_validate_success")
     */
    public function videoValidateSuccess(Request $request)
    {
        if ($request->isMethod('POST')) {
            $em = $this->getDoctrine()->getManager();
            $ad = $em->getRepository('BuxAdvertiseBundle:VideoAd')->find($request->get('id'));
            if ($ad) {
                $ad->setValidate(true);
                $em->flush();

                return new Response('ok', 200);
            }
        }

        return new Response('error', 200);
    }

    /**
     * @param Request $request
     * @param int     $id
     *
     * @return array
     *
     * @Route("/video-ad-allocate/{id}", name="office_account_video_ad_allocate")
     * @Template("BuxAccountBundle:AdvertiserPanel:video_ad_allocate.html.twig")
     */
    public function videoAdAllocateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:VideoAd')->find($id);
        if (!$ad) {
            throw new NotFoundHttpException('Not Found!');
        }

        $form = $this->createForm(new CreditsAllocateFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $credits = $form->get('credits')->getData();
                $user = $this->getUser();
                $userCredits = $user->getVideoCredits();
                if ($userCredits->getCredits() < $credits) {
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        $this->get('translator')->trans('frontend.account.advertiser.form.credits_allocate_error')
                    );
                } else {
                    $userCredits->setCredits($userCredits->getCredits() - $credits);
                    $ad->setCredits($credits);
                    $em->flush();
                    $this->get('session')->getFlashBag()->add(
                        'success',
                        $this->get('translator')->trans('frontend.account.advertiser.form.credits_allocate_success')
                    );

                    return $this->redirect($this->generateUrl('office_account_advertiser_panel'));
                }
            }
        }

        return array(
            'form'  => $form->createView(),
            'ad'    => $ad
        );
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/add-video-ads", name="office_account_add_video_ads")
     * @Template("BuxAccountBundle:AdvertiserPanel:add_video_ads.html.twig")
     */
    public function addVideoAds(Request $request)
    {
        /* @var $em EntityManager */
        $em     = $this->getDoctrine()->getManager();
        $form = $this->createForm(new VideoAdsFormType());

        $page = $em->getRepository('BuxAdminSetupBundle:StaticPage')->findOneBy(array(
            'name' => 'terms'
        ));

//        dump($page);exit;

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $data   = $form->getData();
                $data->setUser($this->getUser());
                $data->setValidate(true);

                $em->persist($data);
                $em->flush();

                return $this->redirect($this->generateUrl('office_account_advertiser_panel'));
            }
        }

        return array(
            'form'  => $form->createView(),
            'page'  => $page->getContent()
        );
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/delete-video-ad/{id}", name="office_account_delete_video_ad")
     */
    public function deleteVideoAd($id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:VideoAd')->find($id);
        if (!$ad) {
            throw new NotFoundHttpException('Not Found!');
        }

        $user = $this->getUser();
        $userCredits = $user->getVideoCredits();
        $userCredits->setCredits($userCredits->getCredits() + $ad->getCredits());
        $em->remove($ad);
        $em->flush();

        return $this->redirect($this->generateUrl('office_account_advertiser_panel'));
    }

    /**
     * @param int $id
     *
     * @return bool
     *
     * @Route("/pause-video-ad/{id}", name="office_account_pause_video_ad")
     */
    public function pauseVideoAd($id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:VideoAd')->find($id);
        if (!$ad) {
            throw new NotFoundHttpException('Not Found!');
        }

        if ($ad->getPause()) {
            $ad->setPause(false);
            $em->flush();

            return new Response('start');
        } else {
            $ad->setPause(true);
            $em->flush();

            return new Response('pause');
        }
    }
}