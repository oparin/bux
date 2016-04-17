<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/29/15
 * Time: 4:32 PM
 */

namespace Bux\Admin\UtilitiesBundle\Controller;

use Bux\Admin\UtilitiesBundle\Entity\BotMembershipType;
use Bux\Admin\UtilitiesBundle\Entity\ReferralBot;
use Bux\Admin\UtilitiesBundle\Form\Type\BotSystem\BotTypesFormType;
use Bux\Admin\UtilitiesBundle\Form\Type\BotSystem\CreateBotsFormType;
use Bux\Admin\UtilitiesBundle\Form\Type\BotSystem\GeneralSettingsFormType;
use Bux\StatisticBundle\Entity\ReferralBotStatistic;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class BotSystemController
 *
 * @package Bux\Admin\UtilitiesBundle\Controller
 *
 * @Route("/bot-system")
 */
class BotSystemController extends Controller
{
    /**
     * @param Request $request
     * @param integer $typeId
     *
     * @return array
     *
     * @Route("/{typeId}", requirements={"typeId" = "\d+"}, name="admin_utilities_bot_system")
     * @Template("BuxAdminUtilitiesBundle:BotSystem:settings.html.twig")
     */
    public function indexAction(Request $request, $typeId = null)
    {
        if ($request->get('tab')) {
            $tab = $request->get('tab');
        } else {
            $tab = 'stat';
        }

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $qb = $em->getRepository('BuxAdminUtilitiesBundle:ReferralBot')->createQueryBuilder('rb');
        $qb
            ->select('COUNT(rb.id)')
            ->where('rb.user IS NULL');
        $countFreeBots = $qb->getQuery()->getSingleScalarResult();

        $qb
            ->select('COUNT(rb.id)')
            ->where('rb.user IS NOT NULL');
        $countRentBots = $qb->getQuery()->getSingleScalarResult();

        $generalSettings = $em->getRepository('BuxAdminUtilitiesBundle:BotGeneralSettings')->find(1);
        $generalSettingsForm = $this->createForm(new GeneralSettingsFormType(), $generalSettings);

        $createBotsForm = $this->createForm(new CreateBotsFormType());
        if ($typeId) {
            $type = $em->getRepository('BuxAdminUtilitiesBundle:BotType')->find($typeId);
            $tab = 'types';
        } else {
            $type = null;
        }
        $botTypeForm    = $this->createForm(new BotTypesFormType(), $type);
        $botTypes       = $em->getRepository('BuxAdminUtilitiesBundle:BotType')->findAll();

        $membership     = $em->getRepository('BuxUserBundle:Membership')->findAll();

        if ($request->isMethod('POST')) {
            $parameters = $request->request->all();
            if (isset($parameters['bot_system_general_settings_form_type'])) {
                $generalSettingsForm->handleRequest($request);
                if ($generalSettingsForm->isValid()) {
                    $tab = 'settings';
                    $em->flush();
                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Success!'
                    );
                }
            }

            if (isset($parameters['bot_system_create_bots_form_type'])) {
                $createBotsForm->handleRequest($request);
                if ($createBotsForm->isValid()) {
                    $tab = 'settings';
                    $number = $createBotsForm->get('number')->getData();

                    for ($i = 1; $i <= $number; $i++) {
                        $bot = new ReferralBot();
                        $em->persist($bot);
                        $em->flush();
                        $bot->setName('Ref' . $bot->getId());
                        $botStatistic = new ReferralBotStatistic();
                        $botStatistic->setReferralBot($bot);
                        $em->persist($botStatistic);
                        $em->flush();
                    }

                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Success!'
                    );
                }
            }

            if (isset($parameters['bot_system_bot_types_form_type'])) {
                $botTypeForm->handleRequest($request);
                $tab = 'types';
                if ($botTypeForm->isValid()) {
                    $data = $botTypeForm->getData();
                    $em->persist($data);
                    $em->flush();
                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Success!'
                    );

                    return $this->redirect($this->generateUrl('admin_utilities_bot_system') . '?tab=types');
                }
            }
        }

        return array(
            'tab'   => $tab,
            'general_settings_form' => $generalSettingsForm->createView(),
            'create_bots_form'      => $createBotsForm->createView(),
            'bot_type_form'         => $botTypeForm->createView(),
            'bot_types'             => $botTypes,
            'membership'            => $membership,
            'count_free_bots'       => $countFreeBots,
            'count_rent_bots'       => $countRentBots,
        );
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/delete-bot-type/{id}", name="admin_utilities_bot_system_delete_bot_type")
     */
    public function deleteBotTypeAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminUtilitiesBundle:BotType')->find($id);
        $em->remove($package);
        $em->flush();

        return $this->redirect($this->generateUrl('admin_utilities_bot_system') . '?tab=types');
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/add-membership-type", name="admin_utilities_bot_system_add_membership_type")
     * @Template("BuxAdminUtilitiesBundle:BotSystem:add_membership_type.html.twig")
     */
    public function addMembershipTypeAction(Request $request)
    {
        $typeID = $request->get('type');
        $percent = $request->get('percent');
        $membershipId = $request->get('membership');

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $type = $em->getRepository('BuxAdminUtilitiesBundle:BotType')->find($typeID);
        if ($type) {
            $membership = $em->getRepository('BuxUserBundle:Membership')->find($membershipId);
            if ($membership) {
                $qb = $em->getRepository('BuxAdminUtilitiesBundle:BotMembershipType')->createQueryBuilder('mt');
                $qb
                    ->select('SUM(mt.percent)')
                    ->where('mt.botType = :type')
                    ->andWhere('mt.membership = :membership')
                    ->setParameter('type', $type)
                    ->setParameter('membership', $membership);
                $percents = $qb->getQuery()->getSingleScalarResult();

                if (($percents + $percent) <= 100) {
                    $membershipType = new BotMembershipType();
                    $membershipType->setMembership($membership);
                    $membershipType->setBotType($type);
                    $membershipType->setPercent($percent);
                    $em->persist($membershipType);
                $em->flush();

                    $data = $em->getRepository('BuxAdminUtilitiesBundle:BotMembershipType')->findBy(array(
                        'botType' => $type,
                        'membership' => $membership
                    ));

                    return array('data' => $data);
                } else {
                    return new Response(json_encode(array('error' => 'The sum of percentage exceed of 100%')));
                }
            }
        }
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/delete-membership-type/{id}", name="admin_utilities_bot_system_delete_membership_type")
     */
    public function deleteMembershipTypeAction($id)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $membershipType = $em->getRepository('BuxAdminUtilitiesBundle:BotMembershipType')->find($id);
        $em->remove($membershipType);
        $em->flush();

        return $this->redirect($this->generateUrl('admin_utilities_bot_system') . '?tab=membership');
    }
}