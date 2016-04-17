<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/11/15
 * Time: 11:21 AM
 */

namespace Bux\Admin\SetupBundle\Controller;

use Bux\Admin\SetupBundle\Entity\MarketingSettings;
use Bux\Admin\SetupBundle\Form\Type\MarketingSettingsFormType;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class MarketingSettingsController
 *
 * @package Bux\Admin\SetupBundle\Controller
 */
class MarketingSettingsController extends Controller
{
    /**
     * @param Request  $request
     * @param int|null $id
     *
     * @return mixed
     *
     * @Route("/marketing-settings/{id}", name="admin_setup_marketing_settings")
     * @Template("BuxAdminSetupBundle:Marketing:marketing_settings.html.twig")
     */
    public function marketingSettingsAction(Request $request, $id = null)
    {
        if ($id) {
            $tab = 'new';
        } else {
            $tab = 'manage';
        }

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $memberships = $em->getRepository('BuxUserBundle:Membership')->findAll();

        if ($id) {
            $level = $em->getRepository('BuxAdminSetupBundle:MarketingSettings')->find($id);
        } else {
            $level = null;
        }
        $form = $this->createForm(new MarketingSettingsFormType(), $level);

        if ($request->isMethod('POST')) {
            $tab = 'new';
            $form->handleRequest($request);
            if ($form->isValid()) {
                /* @var $data MarketingSettings */
                $data = $form->getData();
                $exist = null;
                if (!$id) {
                    $exist = $em->getRepository('BuxAdminSetupBundle:MarketingSettings')->findOneBy(array(
                        'level' => $data->getLevel(),
                        'membership' => $data->getMembership()
                    ));
                }
                if (!$exist) {
                    $em->persist($data);
                    $em->flush();

                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Success!'
                    );

                    return $this->redirect($this->generateUrl('admin_setup_marketing_settings'));
                } else {
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        'Already exist!'
                    );
                }
            }
        }

        return array(
            'tab'           => $tab,
            'form'          => $form->createView(),
            'memberships'   => $memberships
        );
    }
}