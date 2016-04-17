<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/5/15
 * Time: 11:27 AM
 */

namespace Bux\AccountBundle\Form\Type\Referrals;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class RentReferralsType
 *
 * @package Bux\AccountBundle\Form\Type\Referrals
 */
class RentReferralsType extends AbstractType
{
    private $user;
    private $em;

    /**
     * @param User          $user
     * @param EntityManager $em
     */
    public function __construct(User $user, EntityManager $em)
    {
        $this->user = $user;
        $this->em   = $em;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $membership = $this->user->getMembership();
        $packsText = $membership->getRentReferral()->getRefPack();
        $packs = explode(',', $packsText);
        $choice = array();
        foreach ($packs as $number) {
            $qb = $this->em->getRepository('BuxUserBundle:ReferralPrice')->createQueryBuilder('rp');
            $qb
                ->where('rp.membership = :membership')
                ->andWhere('rp.minRef <= :number')
                ->andWhere('rp.maxRef >= :number')
                ->setParameter('membership', $membership)
                ->setParameter('number', $number);
            $price = $qb->getQuery()->getSingleResult();
            $choice[$number] = $number . ' Referrals - $' . $price->getMonthly() * $number;
        }

        $resolver->setDefaults(array(
            'choices' => $choice
        ));
    }

    /**
     * @return null|string|\Symfony\Component\Form\FormTypeInterface
     */
    public function getParent()
    {
        return 'choice';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'rent_referrals';
    }
}