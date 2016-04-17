<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/2/15
 * Time: 4:50 PM
 */

namespace Bux\AccountBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Class PromoController
 *
 * @package Bux\AccountBundle\Controller
 */
class PromoController extends Controller
{
    /**
     * @return array
     *
     * @Route("/promo", name="office_account_promo")
     * @Template("BuxAccountBundle:Promo:promo.html.twig")
     */
    public function promoAction()
    {
        return array();
    }
}